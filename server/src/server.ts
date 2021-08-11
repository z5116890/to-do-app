import express, { Express, Request, Response } from 'express';
const cors = require('cors');
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { setupRoutes } from './routes';

if (process.env.DOTENV) {
    dotenv.config({ path: process.env.DOTENV })
} else {
    dotenv.config() //.env
}

console.log(`DB_USER = `, process.env.DB_USER)

const mysql = require('mysql2')
// create the connection to database

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const app: Express = express();
const router = express.Router()

//allows you to make requests from one website to another website in the browser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

setupRoutes(router)

app.use(router)

app.get('/', (req : Request, res : Response) => {
    console.log(process.env.DB_USER)
    connection.query(
        'SELECT * FROM items;',
        function(err : any, results : any, fields : any) {
            console.log(results); // results contains rows returned by server
            return res.json(results);
        }
    );
});

app.post('/', (req : Request, res : Response) => {
    console.log('hello')
    connection.query('INSERT INTO items (id, todo, completed) VALUES (?,?,?)', [req.body.id, req.body.todo, req.body.completed],(error : any,
        results : any) => {
     if (error) return res.json({ error: error });
     });
});

app.delete('/', function (req : Request, res : Response) {
    console.log('trying to delete');
    console.log(req.body.id);
    connection.query('DELETE FROM items where id = (?)', [req.body.id], function (error : any, results : any) {
        if (error) return res.json({ error: error });
        console.log(results)
    });
});
// use patch
app.put('/', (req : Request, res : Response) => {
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
