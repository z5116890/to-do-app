import { rejects } from 'assert';
import { Request, Response } from 'express';
import { connection } from '../../db';

// return all items for item table
export const getItems = async function () {
    return new Promise((resolve, reject) => {
        console.log('hello');
        connection.query('select * from items', (error, rows) => {
            if (error) {
                reject(error);
            }
            console.log('showing', rows);
            resolve(rows);
        });
    })
};

//insert item into items table
export const insertItem = async function(req : Request) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO items (id, todo, completed) VALUES (?,?,?)', [req.body.id, req.body.todo, req.body.completed],(error : any, results : any) => {
            if (error) reject(error);
            resolve(results);
        })
    });

}

export const deleteItem = function (req : Request) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM items where id = (?)', [req.body.id], (error : any, results : any) => {
            if (error) reject(error);
            resolve(results);
        })
    });
}

export const updateItem = (req : Request) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE items SET completed = NOT completed WHERE id = (?)', [req.body.id],(error : any, results : any) => {
            if (error) return reject(error);
            resolve(results);
        })
    });
};