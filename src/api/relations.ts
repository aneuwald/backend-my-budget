import { Request, Response } from 'express'
import { isObjectIdOrError } from '../config/validation'

import { Category, Purchase } from '../models'

const GET_PURCHASES_BY_CATEGORY = async (req: Request, res: Response) : Promise<Response> => {
  const { id } = req.params

  try {
    isObjectIdOrError(id, 'ID não parece um ser ObjectID válido!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  Purchase.find({ category: id }).lean()
    .then(c => res.send(c))
    .catch(() => res.send('Algo deu errado!'))
}

const GET_CATEGORIES_COMPLETE = async (req: Request, res: Response) : Promise<Response> => {
  const c = []
  const categories = await Category.find().lean()
  for (const i in categories) {
    const purchases = await Purchase.find({ category: categories[i]._id }, '-category').lean()
    const total = purchases.reduce((total, el) => (total + el.price), 0)
    c.push({ ...categories[i], total, purchases })
  }

  return res.send(c)
}

export default {
  GET_PURCHASES_BY_CATEGORY,
  GET_CATEGORIES_COMPLETE
}
