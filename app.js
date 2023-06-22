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

//Clearing database commands
// db.run('DROP TABLE contacts');

//----------------------------------------------------------------
//Routes
//Get methods
app.get('/', (req, res) =>{
    res.render('index.njk', {title: 'Home page'});
})

app.get('/quoteone', (req, res) =>{
  res.render('quoteone.njk');
})

app.get('/regcustomer', (req, res) =>{
  res.render('regcustomer.njk', {title: 'Customers Registration Form'});
})

app.get('/regcontacts', (req, res) => {

  db.all('SELECT * FROM customers', (err, rows) => {
    
    if (err) {
      throw err;
    }

    const codeOptionsCompanyName = rows.map(row => ({value: row.customer_id, label: row.name}));

    res.render('regcontacts.njk', {title: 'Contacts Registration Form', codeOptionsCompanyName});
  })
})

//-----------------------------------------------------
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

  let cust_id = null;
  
  //Command to insert new customes to the customers table in the hydroil.sqlite database
  db.run('INSERT INTO customers (name, abn, address, city, state, postcode, country) VALUES (?, ?, ?, ?, ?, ?, ?)', [companyName, abn, address, city, state, postcode, country], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error updating data in customer table.');
    } else {
      res.status(200);
      console.log('Data updated successfully in customers table.');
      // res.redirect('/regcustomer');
    }
  });

  //Used to find out the customer_id created for this customer so that it can be inserted in the contacts table as a foreign key.
  db.get('SELECT customer_id FROM customers WHERE name = ?', [companyName], (err, row) => {
    
    if (err) {
      console.error(err.message);
    }

    cust_id = row.customer_id;

    db.run('INSERT INTO contacts(customer_id, name, email, phone_number, mobile_number) VALUES (?, ?, ?, ?, ?);', [cust_id, contactName, email, phone, mobile], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error updating data in contacts table.');
      } else {
        res.status(200);
        console.log('Data updated successfully in contacts table.');
        res.redirect('/regcustomer');
      }
    });
  });
});

app.post('/regcontacts', (req, res) => {
  const optCustSupp = req.body.inputCustomerSupplier;
  let accCompanyNameOpt = '';

  if (optCustSupp === 'Customer') {
    db.all('', (err, rows) => {
      
      if (err) {
        throw err;
      }

      rows.forEach(row => {
        accCompanyNameOpt += `<option>${row.name}</option>`
      })

      res.redirect('/regcontacts', {title: 'Contacts Registration Form', codeOptionsCompanyName: accCompanyNameOpt});
    
    })
  }
})


//-----------------------------------------------------------------------
//Server listening

app.listen(port, () => {
    console.log(`Example app lisntening on port ${port}`);
});