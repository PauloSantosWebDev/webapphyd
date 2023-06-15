const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

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

app.set('view engine', 'pug');

app.set('views', 'H:/Algorithm/webproject' + '/views');

app.get('/', (req,res) =>{
    res.render('index');
})

app.listen(port, () => {
    console.log(`Example app lisntening on port ${port}`);
})