import { Response, Request } from 'express'
import Logging from '../library/Logging'

export const errorHandlingMiddleware = (_: Request, res: Response) => {
  const error = new Error('Not found')
  Logging.error(error)

  res.status(404).json({ message: error.message })
}
