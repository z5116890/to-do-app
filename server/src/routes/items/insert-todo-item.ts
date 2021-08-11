import { Request, Response } from 'express'
import { insertItem } from '../../services/db-operations'


// get all items from database
export const insertTodoItem = (req: Request, res: Response) => {

  try {
    console.log(req.body)
    return insertItem(req, res)

  } catch (err) {

    console.error('failed to get insert item', { err })

  }

}
