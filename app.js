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


//Setting up static folders
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('public'));
app.use(express.static('views'));


//Middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//Clearing database commands
// db.run('DROP TABLE contacts');

//----------------------------------------------------------------
//Routes
//Get methods
app.get('/', (req, res) =>{
    res.render('index.njk', {title: 'Home page'});
})

//Quote first page
app.get('/quoteone', (req, res) =>{
  res.render('quoteone.njk');
})

//Customer registration form
app.get('/regcustomer', (req, res) =>{
  res.render('regcustomer.njk', {title: 'Customers Registration Form'});
})

//Supplier registration form
app.get('/regsupplier', (req, res) =>{
  res.render('regsupplier.njk', {title: 'Suppliers Registration Form'});
})

//Contacts registration form
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

//Inserting data into customers and contacts tables through post method.
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

//Inserting data into suppliers and suppliers_contacts tables through post method.
app.post('/regsupplier', (req, res) =>{
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
  
  //Command to insert new suppliers to the suppliers table in the hydroil.sqlite database
  db.run('INSERT INTO suppliers (name, abn, address, city, state, postcode, country) VALUES (?, ?, ?, ?, ?, ?, ?)', [companyName, abn, address, city, state, postcode, country], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error updating data in supplier table.');
    } else {
      res.status(200);
      console.log('Data updated successfully in supplier table.');
    }
  });

  //Used to find out the supplier_id created for this supplier so that it can be inserted in the suppliers_contacts table as a foreign key.
  db.get('SELECT supplier_id FROM suppliers WHERE name = ?', [companyName], (err, row) => {
    
    if (err) {
      console.error(err.message);
    }

    supp_id = row.supplier_id;

    db.run('INSERT INTO suppliers_contacts(supplier_id, name, email, phone_number, mobile_number) VALUES (?, ?, ?, ?, ?);', [supp_id, contactName, email, phone, mobile], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error updating data in suplliers_contacts table.');
      } else {
        res.status(200);
        console.log('Data updated successfully in suppliers_contacts table.');
        res.redirect('/regsupplier');
      }
    });
  });
});



app.post('/regcontacts', (req, res) => {
  
  const data = req.body;
  
  if (data.selection === 'Customer') {

    db.all('SELECT * FROM customers ORDER BY name', (err, rows) => {
    
      if (err) {
        throw err;
      }
  
      const codeOptionsCompanyName = rows.map(row => ({value: row.customer_id, label: row.name}));
      
      res.json({
        status: 'success',
        body: codeOptionsCompanyName
      });

    })

  } else if (data.selection === 'Supplier') {
    
    db.all('SELECT * FROM suppliers ORDER BY name', (err, rows) => {
    
      if (err) {
        throw err;
      }
  
      const codeOptionsCompanyName = rows.map(row => ({value: row.supplier_id, label: row.name}));

      res.json({
        status: 'success',
        body: codeOptionsCompanyName
      });

    })

  } else {
    res.send("Not working yet!");
  }
})


//-----------------------------------------------------------------------
//Server listening

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});