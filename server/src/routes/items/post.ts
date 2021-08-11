import { Request, Response } from 'express'
import { insertItem } from '../../services/dbOperations'


// get all items from database
export const insertTodoItem = (req: Request, res: Response) => {

  try {

    return insertItem(req, res)

  } catch (err) {

    console.error('failed to get insert item', { err })

  }

}
