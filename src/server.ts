import express, { Express } from 'express'
import http from 'http'
import mongoose from 'mongoose'

import { config } from './config/config'
import { incomingOutgoingMiddleware } from './middleware/incomingOutgoing'
import { headersMiddleware } from './middleware/headers'
import Logging from './library/Logging'
import appRoutes from './routes'
import { errorHandlingMiddleware } from './middleware/errorHandler'

const app: Express = express()

// Connect to MongoDB
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.log('Connected to MongoDB.')
    startServer()
  })
  .catch((err) => {
    Logging.error('Unable to connect: ')
    Logging.error(err)
  })

// Only start the server if Mongo connects
const startServer = (): void => {
  // Log the Request and Response
  app.use(incomingOutgoingMiddleware)

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  // Config headers
  app.use(headersMiddleware)

  // Routes
  app.use('/', appRoutes)

  // Health Check
  app.get('/health', (_, res) => res.status(200).json({ status: 'OK' }))

  // Error Handling
  app.use(errorHandlingMiddleware)

  // Start the server
  http.createServer(app).listen(config.server.port, () => {
    Logging.log(`Server started on port ${config.server.port}`)
  })
}
