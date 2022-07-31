import express from 'express'
import authorController from '../controllers/Author'
import { schemas, validateSchema } from '../middleware/validateSchema'

const router = express.Router()

router.post('/create', validateSchema(schemas.author.create), authorController.createAuthor)
router.get('/get/:authorId', authorController.readAuthor)
router.get('/get', authorController.readAll)
router.patch('/update/:authorId', validateSchema(schemas.author.update), authorController.updateAuthor)
router.delete('/delete/:authorId', authorController.deleteAuthor)

export default router
