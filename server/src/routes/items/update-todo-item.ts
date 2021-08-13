import { Request, Response } from 'express'
import { TodoItem } from '../../model/todo-item';
import { updateItem } from '../../services/db-operations'


// get all items from database
export const updateTodoItem = (req: Request, res: Response) => {
  let item: TodoItem = {id: req.body.id, todo: req.body.todo, completed: req.body.completed}
  if (item.id === undefined) {
    return res.sendStatus(400)
  }
  try {

    updateItem(item)
    .then((result) => {
      console.log(result)
      return res.json(result);

    })
    .catch((err) => { console.log(err) });

  } catch (err) {

    console.error('failed to update item', { err })

  }

}
