import express from 'express'

import authorRoutes from './Author'
import bookRoutes from './Book'

const router = express.Router()

router.use('/authors', authorRoutes)
router.use('/books', bookRoutes)

export default router
