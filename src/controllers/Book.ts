import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import Book from '../models/Book'

const createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, author } = req.body

  const book = new Book({ _id: new mongoose.Types.ObjectId(), title, author })

  try {
    await book.save()
    res.status(201).json({ book })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const readBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const bookId = req.params.bookId

  try {
    const book = await Book.findById(bookId).populate('author').select('-__v')

    if (book) {
      res.status(200).json({ book })
      return
    }

    res.status(404).json({ error: 'Book not found' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const readAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booksList = await Book.find().populate('author').select('-__v')

    res.status(200).json({ books: booksList })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const bookId = req.params.bookId

  try {
    const book = await Book.findByIdAndUpdate(bookId, req.body)

    if (book) {
      res.status(201).json({ book })
      return
    }

    res.status(404).json({ error: 'Book not found' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const bookId = req.params.bookId

  try {
    const book = await Book.findByIdAndDelete(bookId)

    if (book) {
      res.status(201).json({ message: 'Book deleted' })
      return
    }

    res.status(404).json({ error: 'Book not found' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export default { createBook, readBook, readAll, updateBook, deleteBook }
