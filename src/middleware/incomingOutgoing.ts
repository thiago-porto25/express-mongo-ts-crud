import { NextFunction, Request, Response } from 'express'
import Logging from '../library/Logging'

export const incomingOutgoingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

  // Log the Response
  res.on('finish', () => {
    Logging.info(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`)
  })

  next()
}
