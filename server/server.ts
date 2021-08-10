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


app.get('/', (req : any, res : any) => {
    connection.query(
        'SELECT * FROM items;',
        function(err : any, results : any, fields : any) {
            console.log(results); // results contains rows returned by server
            return res.json(results);
        }
    );
});

app.post('/', (req : any, res : any) => {
    console.log('hello')
    connection.query('INSERT INTO items (id, todo, completed) VALUES (?,?,?)', [req.body.id, req.body.todo, req.body.completed],(error : any, 
        results : any) => {
     if (error) return res.json({ error: error });
     });
});

app.delete('/', function (req : any, res : any) {
    console.log('trying to delete');
    console.log(req.body.id);
    connection.query('DELETE FROM items where id = (?)', [req.body.id], function (error : any, results : any) {
        if (error) return res.json({ error: error });
        console.log(results)
    });
});

app.put('/', (req : any, res : any) => {
    console.log('updating')
    console.log(req.body)
    connection.query('UPDATE items SET completed = NOT completed WHERE id = (?)', [req.body.id],(error : any, 
        results : any) => {
        if (error) return res.json({ error: error });
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});