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

//Material related tables
//Main table that will link to costs and mechanical properties tables
db.run(`CREATE TABLE IF NOT EXISTS materials (material_id INTEGER PRIMARY KEY AUTOINCREMENT, hydroil_id TEXT NOT NULL, item TEXT NOT NULL, description TEXT NOT NULL, alt_description TEXT NOT NULL, details TEXT, UNIQUE(hydroil_id))`);

//Material costs table
db.run(`CREATE TABLE IF NOT EXISTS material_costs (cost_id INTEGER PRIMARY KEY AUTOINCREMENT, hydroil_id TEXT, date TEXT NOT NULL, supplier_id INTEGER, cost REAL NOT NULL, unit TEXT NOT NULL, 
FOREIGN KEY (hydroil_id) REFERENCES materials(hydroil_id), FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id))`);

//Mechanical properties table
db.run(`CREATE TABLE IF NOT EXISTS mechanical_properties (properties_id INTEGER PRIMARY KEY AUTOINCREMENT, hydroil_id TEXT, yield_mpa REAL, yield_psi REAL, uts_mpa REAL, uts_psi REAL, young REAL, FOREIGN KEY (hydroil_id) REFERENCES materials(hydroil_id))`);

//Resources table - for big files
db.run(`CREATE TABLE IF NOT EXISTS resources (resources_id INTEGER PRIMARY KEY AUTOINCREMENT, hydroil_id TEXT, file BLOB, FOREIGN KEY (hydroil_id) REFERENCES materials(hydroil_id))`);

//Services related tables
//Main table that will link to costs table
db.run(`CREATE TABLE IF NOT EXISTS ext_services (service_id INTEGER PRIMARY KEY AUTOINCREMENT, service_code TEXT NOT NULL, service TEXT NOT NULL, description TEXT NOT NULL, alt_description TEXT NOT NULL, details TEXT, UNIQUE(service_code))`);

//Material costs table
db.run(`CREATE TABLE IF NOT EXISTS ext_services_costs (cost_id INTEGER PRIMARY KEY AUTOINCREMENT, service_code TEXT, date TEXT NOT NULL, supplier_id INTEGER, cost REAL NOT NULL, unit TEXT NOT NULL, 
FOREIGN KEY (service_code) REFERENCES ext_services(service_code), FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id))`);

// db.run(`CREATE TABLE IF NOT EXISTS materials (material_id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, hydroil_id TEXT NOT NULL, item TEXT NOT NULL, description TEXT NOT NULL, alt_description TEXT NOT NULL, supplier TEXT NOT NULL, supplier_id INTEGER, 
//   cost REAL NOT NULL, unit TEXT NOT NULL, details TEXT, yield_mpa REAL, yield_psi REAL, uts_mpa REAL, uts_psi REAL, young REAL)`);

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