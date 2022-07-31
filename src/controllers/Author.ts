import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import Author from '../models/Author'

const createAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name } = req.body

  const author = new Author({ _id: new mongoose.Types.ObjectId(), name })

  try {
    await author.save()
    res.status(201).json({ author })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const readAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authorId = req.params.authorId

  try {
    const author = await Author.findById(authorId)

    if (author) {
      res.status(200).json({ author })
      return
    }

    res.status(404).json({ error: 'Author not found' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const readAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authorsList = await Author.find()

    res.status(200).json({ authors: authorsList })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const updateAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authorId = req.params.authorId

  try {
    const author = await Author.findByIdAndUpdate(authorId, req.body)

    if (author) {
      res.status(201).json({ author })
      return
    }

    res.status(404).json({ error: 'Author not found' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const deleteAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authorId = req.params.authorId

  try {
    const author = await Author.findByIdAndDelete(authorId)

    if (author) {
      res.status(201).json({ message: 'Author deleted' })
      return
    }

    res.status(404).json({ error: 'Author not found' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export default { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor }
