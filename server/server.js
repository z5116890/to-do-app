"use strict";
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
// create the connection to database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Akabana247!',
    database: 'todo'
});
var app = express();
//allows you to make requests from one website to another website in the browser
app.use(cors());
app.use(bodyParser.json());
app.get('/', function (req, res) {
    connection.query('SELECT * FROM items;', function (err, results, fields) {
        console.log(results); // results contains rows returned by server
        return res.json(results);
    });
});
app.post('/', function (req, res) {
    console.log('hello');
    connection.query('INSERT INTO items (id, todo, completed) VALUES (?,?,?)', [req.body.id, req.body.todo, req.body.completed], function (error, results) {
        if (error)
            return res.json({ error: error });
    });
});
app.delete('/', function (req, res) {
    console.log('trying to delete');
    console.log(req.body.id);
    connection.query('DELETE FROM items where id = (?)', [req.body.id], function (error, results) {
        if (error)
            return res.json({ error: error });
        console.log(results);
    });
});
app.put('/', function (req, res) {
    console.log('updating');
    console.log(req.body);
    connection.query('UPDATE items SET completed = NOT completed WHERE id = (?)', [req.body.id], function (error, results) {
        if (error)
            return res.json({ error: error });
    });
});
var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("listening on " + port);
});
