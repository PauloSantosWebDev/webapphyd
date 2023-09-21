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

//External services costs table
db.run(`CREATE TABLE IF NOT EXISTS ext_services_costs (cost_id INTEGER PRIMARY KEY AUTOINCREMENT, service_code TEXT, date TEXT NOT NULL, supplier_id INTEGER, cost REAL NOT NULL, unit TEXT NOT NULL, 
FOREIGN KEY (service_code) REFERENCES ext_services(service_code), FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id))`);

//Quote-control tables
//Main quote table (summary)
db.run(`CREATE TABLE IF NOT EXISTS quote (quote_id INTEGER PRIMARY KEY AUTOINCREMENT, quote_hyd_id INTEGER NOT NULL, taken TEXT, total_price INTEGER, status TEXT NOT NULL, contact_id INTEGER, FOREIGN KEY (contact_id) REFERENCES contacts(contact_id), UNIQUE(quote_hyd_id))`);

//Version control table
db.run(`CREATE TABLE IF NOT EXISTS quote_version (quote_version_id INTEGER PRIMARY KEY AUTOINCREMENT, quote_id INTEGER NOT NULL, quote_version INTEGER NOT NULL, version_price INTEGER, FOREIGN KEY (quote_id) REFERENCES quote(quote_id))`);

//Item control table
db.run(`CREATE TABLE IF NOT EXISTS quote_item (quote_id INTEGER, quote_version INTEGER, quote_item INTEGER, quantity INTEGER, specification TEXT, price INTEGER, FOREIGN KEY (quote_id) REFERENCES quote(quote_id), FOREIGN KEY (quote_version) REFERENCES quote_version(quote_version))`);

//Cylinder basic specs control table
db.run(`CREATE TABLE IF NOT EXISTS cylinder (quote_id INTEGER, quote_version INTEGER, quote_item INTEGER, body_type TEXT, inner_type TEXT, force_generator TEXT, acting_type TEXT, closed_centers INTEGER, 
      push_pressure INTEGER, pull_pressure INTEGER, push_force INTEGER, pull_force INTEGER, cylinder_mounting TEXT, rod_end_mounting TEXT, cushions TEXT, pins TEXT, special_features TEXT, FOREIGN KEY (quote_id) REFERENCES quote(quote_id),
      FOREIGN KEY (quote_version) REFERENCES quote_version(quote_version))`);

//Cylinder bore, rod and stroke control
db.run(`CREATE TABLE IF NOT EXISTS cylinder_brs (quote_id INTEGER, quote_version INTEGER, quote_item INTEGER, brs_id INTEGER NOT NULL, bore INTEGER, rod INTEGER, gross_stroke INTEGER, 
      stop_tube INTEGER, net_stroke INTEGER, FOREIGN KEY (quote_id) REFERENCES quote(quote_id), FOREIGN KEY (quote_version) REFERENCES quote_version(quote_version))`);

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