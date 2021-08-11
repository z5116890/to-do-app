import { Router } from 'express'
import * as ping from './ping'

export const setupRoutes = (router: Router): void => {

  router.get('/', ping.getTodoItems)
  router.delete('/', ping.deleteTodoItem)
  router.post('/', ping.insertTodoItem)
  router.patch('/', ping.updateTodoItem)
}
