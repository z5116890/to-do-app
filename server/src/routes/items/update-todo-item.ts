import { Request, Response } from 'express'
import { updateItem } from '../../services/db-operations'


// get all items from database
export const updateTodoItem = (req: Request, res: Response) => {

  try {

    return updateItem(req, res)

  } catch (err) {

    console.error('failed to update item', { err })

  }

}
