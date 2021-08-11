import { Request, Response } from 'express'
import { deleteItem } from '../../services/dbOperations'


// get all items from database
export const deleteTodoItem = (req: Request, res: Response) => {

  try {

    return deleteItem(req, res)

  } catch (err) {

    console.error('failed to get delete item', { err })

  }

}
