import Joi, { ObjectSchema } from 'joi'
import { NextFunction, Response, Request } from 'express'
import Logging from '../library/Logging'
import { IAuthor } from '../models/Author'
import { IBook } from '../models/Book'

export const validateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      Logging.error(error)
      res.status(422).json({ error })
    }
  }
}

export const schemas = {
  author: {
    create: Joi.object<IAuthor>({
      name: Joi.string().required(),
    }),
    update: Joi.object<IAuthor>({
      name: Joi.string().required(),
    }),
  },
  book: {
    create: Joi.object<IBook>({
      title: Joi.string().required(),
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    update: Joi.object<IBook>({
      title: Joi.string().required(),
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
}
