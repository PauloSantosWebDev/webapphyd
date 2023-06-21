const express = require('express');
const db = require('./db');
const path = require('path');
const nunjucks = require('nunjucks');
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


//Database commands
db.run('CREATE TABLE IF NOT EXISTS customers (customer_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, bill_to TEXT, abn TEXT)');
// db.run('INSERT INTO customers (name, bill_to, abn) VALUES (?, ?, ?)', ['Text1', 'Somewhere', '123456']);

db.all('SELECT * FROM customers', (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach(row => {
    console.log(row.customer_id, row.name, row.bill_to, row.abn);
  })
})

//Routes
//Get methods
app.get('/', (req,res) =>{
    res.render('index.njk');
})

app.get('/quoteone', (req,res) =>{
  res.render('quoteone.njk');
})

app.get('/regcustomer', (req,res) =>{
  res.render('regcustomer.njk');
})

//Post methods

// app.post('/regcustomer', (req,res) =>{
//   // res.render('regcustomer.njk');
// })

app.listen(port, () => {
    console.log(`Example app lisntening on port ${port}`);
})