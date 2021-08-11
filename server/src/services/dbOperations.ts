import { connection } from '../server';
import { Request, Response } from 'express';

// return all items for item table
export const getItems = (req : Request, res : Response) => {
    console.log('hello')
    connection.query('INSERT INTO items (id, todo, completed) VALUES (?,?,?)', [req.body.id, req.body.todo, req.body.completed],(error : any,
        results : any) => {
     if (error) return res.json({ error: error });
     });
}

//insert item into items table
export const insertItem = (req : Request, res : Response) => {
    console.log('hello')
    connection.query('INSERT INTO items (id, todo, completed) VALUES (?,?,?)', [req.body.id, req.body.todo, req.body.completed],(error : any,
        results : any) => {
     if (error) return res.json({ error: error });
     });

}

export const deleteItem = function (req : Request, res : Response) {
    console.log('trying to delete');
    console.log(req.body.id);
    connection.query('DELETE FROM items where id = (?)', [req.body.id], function (error : any, results : any) {
        if (error) return res.json({ error: error });
        console.log(results)
    });
}

export const updateItem = (req : Request, res : Response) => {
    console.log('updating')
    console.log(req.body)
    connection.query('UPDATE items SET completed = NOT completed WHERE id = (?)', [req.body.id],(error : any,
        results : any) => {
        if (error) return res.json({ error: error });
    });
};