import { Router, Request, Response } from 'express'
import * as items from './items'

export const setupRoutes = (router: Router): void => {

  router.get('/', (req : Request, res : Response) => {
    console.log(req.body)
    items.getTodoItems(req, res)
  })
  router.delete('/', (req : Request, res : Response) => items.deleteTodoItem(req, res))
  router.post('/', (req : Request, res : Response) => items.insertTodoItem(req, res))
  router.patch('/', (req : Request, res : Response) => items.updateTodoItem(req, res))
}
