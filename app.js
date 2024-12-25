const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
const app = express();

app.use(express.json());

// Declare the db variable globally to access it in routes
let db;

// Database connection
connectToDb((err) => {
  if (!err) {
    // If the database connection is successful, start the Express server
    app.listen(3000, () => {
      console.log("Server is Running on port 3000");
    });

    // Once connected, initialize the db variable to hold the database connection
    db = getDb();
  }
});

// Route to handle GET request on /author
app.get("/author", (req, res) => {
  let authors = []; // Array to hold author data
  // current page
  const page = req.query.p|| 0;
  const authorsPage = 3;

  // Use cursor.forEach to go through each document and add it to the authors array
  db.collection("Author")
    .find() // Query all documents from the 'Author' collection
    .sort({ author: 1 }) // Sort the documents by the 'author' field in ascending order
    .skip(page * authorsPage)
    .limit(authorsPage)
    .forEach((author) => authors.push(author)) // Go through each author document and add it to the authors array
    .then(() => {
      // After collecting all the documents in the authors array, send the array as a JSON response
      res.status(200).json(authors);
    })
    .catch(() => {
      // Handle any errors by sending an error response with status 500 (Internal Server Error)
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

// Finding single Document
app.get("/author/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("Author")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the documents" });
      });
  } else {
    res.status(500).json({ error: "Not a variable document id" });
  }
});

// handling post request

app.post("/author", (req, res) => {
  const author = req.body;

  db.collection("Author")
    .insertOne({ author })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not create a new document" });
    });
});

// handling delete request
app.delete("/author/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("Author")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete a document by id" });
      });
  } else {
    res.status(500).json({ error: "Not a variable document id" });
  }
});

// handling patch request
app.patch("/author/:id", (req, res) => {
  const updates = req.body;
  if (ObjectId.isValid(req.params.id)) {
    db.collection("Author")
      .updateOne(
        { _id: new ObjectId(req.params.id) }, // Find document by ID
        { $set: updates }, // Update the fields
        { upsert: false } // Ensure no new document is inserted
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not Update a document by id" });
      });
  } else {
    res.status(500).json({ error: "Not a variable document id" });
  }
});
