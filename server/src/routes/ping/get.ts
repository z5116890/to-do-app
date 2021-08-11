import { Request, Response } from 'express'
import { getItems } from '../../services/dbOperations'


// get all items from database
export const getTodoItems = (req: Request, res: Response) => {

  try {

    return getItems(req, res)

  } catch (err) {

    console.error('failed to get get items', { err })

  }

}
