import { Request, Response } from 'express'
import { TodoItem } from '../../model/todo-item';
import { insertItem } from '../../services/db-operations'


// get all items from database
export const insertTodoItem = (req: Request, res: Response) => {
  let item: TodoItem = {id: req.body.id, todo: req.body.todo, completed: req.body.completed}
  console.log(item.todo, item.completed)
  if (!item.todo || item.completed === null) {
    return res.sendStatus(400)
  }
  try {
    insertItem(item)
    .then((result) => {
      console.log('yes')
      console.log(result)
      return res.json(result);

    })
    .catch((err) => { console.log(err) });
  } catch (err) {

    console.error('failed to get insert item', { err })

  }

}
