import { connection } from '../../db';
import { TodoItem } from '../model/todo-item';

// return all items for item table
export const getItems = async function () {

    let result: TodoItem[];

    return new Promise((resolve, reject) => {
        console.log('hello');
        connection.query('select * from items', (error, rows) => {
            if (error) {
                reject(error);
            }
            // convert into array of object
            let rows_obj = JSON.parse(JSON.stringify(rows))
            // map into type todoitem
            result = rows_obj.map((row: { id: string; todo: string; completed: string; }) => Object.assign({id: row.id, todo: row.todo, completed: row.completed}))
            resolve(result);

        });
    })
};


//insert item into items table
export const insertItem = async function(request: TodoItem) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO items (todo, completed) VALUES (?,?)', [request.todo, request.completed],(error : any, results : any) => {
            if (error) reject(error);
            resolve(results);
        })
    });

}

export const deleteItem = function (request: TodoItem) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM items where id = (?)', [request.id], (error : any, results : any) => {
            if (error) reject(error);
            resolve(results);
        })
    });
}

export const updateItem = (request: TodoItem) => {
    return new Promise((resolve, reject) => {
        console.log(request.id)
        connection.query('UPDATE items SET completed = NOT completed WHERE id = (?)', [request.id],(error : any, results : any) => {
            if (error) return reject(error);
            resolve(results);
        })
    });
};
