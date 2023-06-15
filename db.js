const sqlite3 = require('sqlite3').verbose();

//open the database connection
let db = new sqlite3.Database("hydroil.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
})

module.exports = db;