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

  //Command to update the database
  db.run('INSERT INTO customers (name, abn, address, city, state, postcode, country) VALUES (?, ?, ?, ?, ?, ?, ?)', [companyName, abn, address, city, state, postcode, country], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error updating data in the table.');
    } else {
      res.status(200);
      console.log('Data updated successfully.');
      res.redirect('/regcustomer');
    }
  });
})

app.listen(port, () => {
    console.log(`Example app lisntening on port ${port}`);
})