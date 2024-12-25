# MongoDB Course

## 1. Introduction to MongoDB
- **What is MongoDB and why it's used**: MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It allows for scalable, high-performance storage of large datasets.
- **Introduction to NoSQL databases**: NoSQL databases, such as MongoDB, offer flexibility in data modeling, allowing for unstructured or semi-structured data, and scaling horizontally.
- **Installing MongoDB and setting up a local server**: Steps to install MongoDB locally and run it as a background service.

## 2. MongoDB Basics
- **MongoDB data structure**: Data is stored in collections, which contain documents. Documents are the basic unit of data and are written in BSON (Binary JSON) format.
- **Introduction to BSON (Binary JSON) format**: BSON is a binary representation of JSON-like documents used by MongoDB to efficiently store data.
- **Basic MongoDB commands for creating databases and collections**:
    ```bash
    use myDatabase
    db.createCollection('myCollection')
    ```

## 3. CRUD Operations
- **Create**: Inserting documents into collections using `insertOne()` or `insertMany()`.
    ```javascript
    db.collection('authors').insertOne({ name: 'John Doe', nationality: 'American' });
    ```
- **Read**: Querying data using `find()`.
    ```javascript
    db.collection('authors').find({ name: 'John Doe' });
    ```
- **Update**: Updating documents with `$set` and other update operators.
    ```javascript
    db.collection('authors').updateOne({ name: 'John Doe' }, { $set: { nationality: 'British' } });
    ```
- **Delete**: Removing documents using `deleteOne()` and `deleteMany()`.
    ```javascript
    db.collection('authors').deleteOne({ name: 'John Doe' });
    ```

## 4. Indexes in MongoDB
- **What are indexes**: Indexes are special data structures that improve query performance by reducing the number of documents MongoDB needs to scan.
- **Why use indexes**:
  - Improve query speed.
  - Optimize sorting operations.
  - Support unique constraints.
- **Types of indexes**:
  - **Single-field index**:
    ```javascript
    db.collection.createIndex({ field: 1 }); // Ascending order
    ```
  - **Compound index**:
    ```javascript
    db.collection.createIndex({ field1: 1, field2: -1 });
    ```
  - **Text index**:
    ```javascript
    db.collection.createIndex({ field: "text" });
    ```
  - **Multikey index**:
    ```javascript
    db.collection.createIndex({ arrayField: 1 });
    ```
  - **Geospatial index**:
    ```javascript
    db.collection.createIndex({ location: "2dsphere" });
    ```
  - **Unique index**:
    ```javascript
    db.collection.createIndex({ username: 1 }, { unique: true });
    ```
  - **Sparse index**:
    ```javascript
    db.collection.createIndex({ optionalField: 1 }, { sparse: true });
    ```
  - **TTL index**:
    ```javascript
    db.collection.createIndex({ timestamp: 1 }, { expireAfterSeconds: 3600 });
    ```
- **How to view indexes**:
    ```javascript
    db.collection.getIndexes();
    ```
- **Querying with indexes**: Use `.explain()` to analyze index usage:
    ```javascript
    db.collection.find({ field: value }).explain("executionStats");
    ```
- **Impact on write operations**: Indexes may slow down writes due to additional overhead of maintaining the index.

## 5. Aggregation in MongoDB
- **Introduction to the aggregation pipeline**: A powerful tool to perform data transformations and analysis.
- **Using stages like `$match`, `$group`, `$sort`, `$project` for data manipulation**:
    ```javascript
    db.collection('authors').aggregate([
      { $match: { nationality: 'American' } },
      { $group: { _id: '$nationality', count: { $sum: 1 } } }
    ]);
    ```

## 6. Relationships in MongoDB
- **One-to-many relationships**: Using embedded documents and references.
    ```javascript
    db.collection('authors').insertOne({
      name: 'John Doe',
      books: [{ title: 'Book One', year: 2021 }]
    });
    ```
- **Many-to-many relationships**: Using references with `ObjectId` for related collections.
    ```javascript
    db.collection('books').insertOne({
      title: 'Book One',
      authorId: ObjectId('605c72ef1532072ee6db9f2')
    });
    ```