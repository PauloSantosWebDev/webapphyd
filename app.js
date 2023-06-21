const express = require('express');
const db = require('./db');
const path = require('path');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

//Setting up view engine, templating and static files source
nunjucks.configure('views', {
  autoescape: true,
  express: app
})

app.set('view engine', 'njk');

app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('public'));
app.use(express.static('views'));


//Middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Database commands
// db.run('DROP TABLE customers;');
// db.run('CREATE TABLE IF NOT EXISTS customers (customer_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, bill_to TEXT, abn TEXT)');
// db.run('INSERT INTO customers (name, bill_to, abn) VALUES (?, ?, ?)', ['Text1', 'Somewhere', '123456']);


//Routes
//Get methods
app.get('/', (req, res) =>{
    res.render('index.njk');
})

app.get('/quoteone', (req, res) =>{
  res.render('quoteone.njk');
})

app.get('/regcustomer', (req, res) =>{
  res.render('regcustomer.njk');
})

//Post methods

app.post('/regcustomer', (req, res) =>{
  const companyName = req.body.inputCompanyName;
  const abn = req.body.inputABN;
  const address = req.body.inputAddress;
  const city = req.body.inputCity;
  const state = req.body.inputState;
  const postcode = req.body.inputPostCode;
  const country = req.body.inputCountry;

  const contactName = req.body.inputName;
  const email = req.body.inputEmail;
  const phone = req.body.inputPhoneNumber;
  const mobile = req.body.inputMobileNumber;

  let cust_id = '';
  
  //Command to insert new customes to the customers table in the hydroil.sqlite database
  db.run('INSERT INTO customers (name, abn, address, city, state, postcode, country) VALUES (?, ?, ?, ?, ?, ?, ?)', [companyName, abn, address, city, state, postcode, country], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error updating data in the table.');
    } else {
      res.status(200);
      console.log('Data updated successfully.');
      // res.redirect('/regcustomer');
      // res.send('<script>alert("Processing completed successfully!");</script>');
    }
  });

  db.get('SELECT customer_id FROM customers WHERE name = ?', [companyName], (err, row) => {
    if (err) {
      console.error(err.message);
    }

    cust_id = row.customer_id;
    console.log('Customer ID is: ' + cust_id);
  })

  db.run('INSERT INTO contacts(customer_id, name, email, phone_number, mobile_number) VALUES (?, ?, ?, ?, ?);', [cust_id, contactName, email, phone, mobile], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error updating data in the table.');
    } else {
      res.status(200);
      console.log('Data updated successfully.');
      res.redirect('/regcustomer');
      // res.send('<script>alert("Processing completed successfully!");</script>');
    }
  });

  db.all("PRAGMA table_info(contacts)", (err, rows) => {
    if (err) {
      throw err;
    }

    // Process the result set to display the schema information
    console.log("Column Name\tData Type\tNullable\tDefault Value");
    console.log("-----------\t---------\t--------\t-------------");
    rows.forEach(row => {
      console.log(`${row.name}\t\t${row.type}\t\t${row.notnull === 0 ? "YES" : "NO"}\t\t${row.dflt_value}`);
    });
  });

  db.all('SELECT * FROM contacts', (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach(row => {
      console.log(row.customer_id, row.name, row.email, row.phone_number, row.mobile_number);
    })
  })

  db.all('SELECT * FROM customers', (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach(row => {
      console.log(row.customer_id, row.name, row.abn, row.address, row.city, row.state, row.postcode, row.country);
    })
  })

  db.all('SELECT * FROM contacts WHERE customer_id = 33', (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach(row => {
      console.log(row.customer_id, row.name, row.email, row.phone_number, row.mobile_number);
    })
  })

})

app.listen(port, () => {
    console.log(`Example app lisntening on port ${port}`);
})