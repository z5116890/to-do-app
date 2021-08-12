import { Request, Response } from 'express'
import { deleteItem } from '../../services/db-operations'
import { TodoItem } from '../../model/todo-item';

// get all items from database
export const deleteTodoItem = (req: Request, res: Response) => {
  let item: TodoItem = {id: req.body.id, todo: req.body.todo, completed: req.body.completed}
  try {
    deleteItem(item)
    .then((result) => {
      console.log(result)
      return res.json(result);

    })
    .catch((err) => { console.log(err) });

  } catch (err) {

    console.error('failed to get delete item', { err })

  }

}
