import { Request, Response } from 'express'
import { getItems } from '../../services/db-operations'


// get all items from database
export const getTodoItems = (req: Request, res: Response) => {
  try {
    // handles query
    getItems()
    .then((result) => {
      console.log(result)

      return res.json(result);

    })
    .catch((err) => { console.log(err) });

  } catch (err) {

    console.error('failed to get get items', { err })

  }

}
