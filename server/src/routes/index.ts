import { Router } from 'express'
import * as ping from './ping'

export const setupRoutes = (router: Router): void => {

  router.get('/ping', ping.get)
}
