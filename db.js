const sqlite3 = require('sqlite3').verbose();

//open the database connection
let db = new sqlite3.Database("hydroil.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
})

//Creating the tables needed if needed.
//Customers table
db.run('CREATE TABLE IF NOT EXISTS customers (customer_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, abn TEXT, address TEXT, city TEXT, state TEXT, postcode TEXT, country TEXT)');

//Customers' contacts table
db.run('CREATE TABLE IF NOT EXISTS contacts (customer_id INTEGER NOT NULL, contact_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, phone_number TEXT, mobile_number TEXT, FOREIGN KEY (customer_id) REFERENCES customers(customer_id))');

//Suppliers table
db.run('CREATE TABLE IF NOT EXISTS suppliers (supplier_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, abn TEXT, address TEXT, city TEXT, state TEXT, postcode TEXT, country TEXT)');

//Suppliers' contacts table
db.run('CREATE TABLE IF NOT EXISTS suppliers_contacts (supplier_id INTEGER NOT NULL, contact_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, phone_number TEXT, mobile_number TEXT, FOREIGN KEY (supplier_id) REFERENCES customers(supplier_id))');

//Labour costs table
db.run('CREATE TABLE IF NOT EXISTS labour (labour_id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, mc TEXT NOT NULL, ncctr TEXT NOT NULL, welding TEXT NOT NULL, honing TEXT NOT NULL, assembling TEXT NOT NULL, description TEXT)');

module.exports = db;

//Useful code below
// db.all('SELECT * FROM customers', (err, rows) => {
//   if (err) {
//     throw err;
//   }
//   rows.forEach(row => {
//     console.log(row.customer_id, row.name, row.abn, row.address, row.city, row.state, row.postcode, row.country);
//   })
// })

// db.all("PRAGMA table_info(customers)", (err, rows) => {
//   if (err) {
//     throw err;
//   }

//   // Process the result set to display the schema information
//   console.log("Column Name\tData Type\tNullable\tDefault Value");
//   console.log("-----------\t---------\t--------\t-------------");
//   rows.forEach(row => {
//     console.log(`${row.name}\t\t${row.type}\t\t${row.notnull === 0 ? "YES" : "NO"}\t\t${row.dflt_value}`);
//   });
// });


  // db.run('UPDATE customers SET name = ?, abn = ?, address = ?, city = ?, state = ?, postcode = ?, country = ?', [companyName, abn, address, city, state, postcode, country], (err) => {
  //   if (err) {
  //     console.error(err.message);
  //     res.status(500).send('Error updating data in the table.');
  //   } else {
  //     res.status(200);
  //     console.log('Data updated successfully.');
  //     // .send('Data updated successfully.');
  //     res.render('regcustomer.njk');
  //     res.end();
  //   }
  // });