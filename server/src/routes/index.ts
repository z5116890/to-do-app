import { Router, Request, Response } from 'express'
import * as items from './items'

export const setupRoutes = (router: Router): void => {

  router.get('/', items.getTodoItems)
  router.delete('/', items.deleteTodoItem)
  router.post('/', items.insertTodoItem)
  router.patch('/', items.updateTodoItem)
}
