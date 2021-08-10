import { NextFunction, Request, Response } from 'express'

export const get = async (req: Request, res: Response, next: NextFunction) => {

  try {

    res.json({ message: 'pong' })

  } catch (err) {

    console.error('failed to get Ping reply', { err })
    return next(err)

  }

}
