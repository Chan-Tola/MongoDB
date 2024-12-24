const { MongoClient } = require("mongodb");

let dbConnection; // Variable to store the database connection

module.exports = {
  // connectToDb: This function sets up a connection to the MongoDB database
  connectToDb: (cb) => {
    // Connect to MongoDB using the URI (in this case, localhost:27017 with the database name 'AuthorData')
    MongoClient.connect("mongodb://localhost:27017/AuthorData")
      .then((client) => {
        // If the connection is successful, store the database connection object
        dbConnection = client.db();
        
        // Call the callback function (cb) to notify that the connection is successful
        return cb();
      })
      .catch((err) => {
        // If there's an error in connecting, log the error to the console
        console.log(err);

        // Call the callback function with the error (so the calling function knows there was an issue)
        return cb(err);
      });
  },
  
  // getDb: This function returns the database connection object
  getDb: () => dbConnection,
};
