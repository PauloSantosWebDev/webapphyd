const express = require('express');
const app = express();
const port = 3000;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');


app.set('view engine', 'pug');

app.set("views", "H:/Algorithm/webproject" + "/views");

app.get('/', (req,res) =>{
    res.render('index');
})

app.listen(port, () => {
    console.log(`Example app lisntening on port ${port}`);
})