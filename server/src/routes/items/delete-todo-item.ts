import { Request, Response } from 'express'
import { deleteItem } from '../../services/db-operations'
import { TodoItem } from '../../model/todo-item';

// get all items from database
export const deleteTodoItem = (req: Request, res: Response) => {
  console.log("req", req.body)
  let item: TodoItem = {id: req.body.id, todo: req.body.todo, completed: req.body.completed}
  console.log('look here', item.id)
  if(item.id === undefined) {
    return res.sendStatus(400)
    
  }
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
