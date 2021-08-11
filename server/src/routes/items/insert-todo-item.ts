import { Request, Response } from 'express'
import { insertItem } from '../../services/db-operations'


// get all items from database
export const insertTodoItem = (req: Request, res: Response) => {

  try {
    insertItem(req)
    .then((result) => {
      console.log(result)
      return res.json(result);

    })
    .catch((err) => { console.log(err) });
  } catch (err) {

    console.error('failed to get insert item', { err })

  }

}
