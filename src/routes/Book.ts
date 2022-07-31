import express from 'express'
import bookController from '../controllers/Book'
import { schemas, validateSchema } from '../middleware/validateSchema'

const router = express.Router()

router.post('/create', validateSchema(schemas.book.create), bookController.createBook)
router.get('/get/:bookId', bookController.readBook)
router.get('/get', bookController.readAll)
router.patch('/update/:bookId', validateSchema(schemas.book.update), bookController.updateBook)
router.delete('/delete/:bookId', bookController.deleteBook)

export default router
