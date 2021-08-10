const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2')
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Akabana247!',
    database: 'todo'
});
const app = express();

//allows you to make requests from one website to another website in the browser
app.use(cors());
app.use(bodyParser.json());




app.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM items;',
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            return res.json(results);
        }
    );
});

app.post('/', (req, res) => {
    console.log('hello')
    connection.query('INSERT INTO items (id, todo, completed) VALUES (?,?,?)', [req.body.id, req.body.todo, req.body.completed],(error, 
        results) => {
     if (error) return res.json({ error: error });
     });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});