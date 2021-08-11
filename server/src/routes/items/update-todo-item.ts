import { Request, Response } from 'express'
import { updateItem } from '../../services/db-operations'


// get all items from database
export const updateTodoItem = (req: Request, res: Response) => {

  try {

    updateItem(req)
    .then((result) => {
      console.log(result)
      return res.json(result);

    })
    .catch((err) => { console.log(err) });

  } catch (err) {

    console.error('failed to update item', { err })

  }

}
