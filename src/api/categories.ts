import { Request, Response } from 'express'
import { existOrError, isPercentageOrError, isObjectIdOrError } from '../config/validation'

import { Category, Purchase } from '../models'

const GET_CATEGORY = async (req: Request, res: Response) : Promise<Response> => {
  const { id } = req.params

  try {
    id && isObjectIdOrError(id, 'ID não parece um ser ObjectID válido!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  if (id) {
    Category.findOne({ _id: id }).lean()
      .then(c => res.send(c))
      .catch(e => res.send({}))
  } else {
    Category.find().lean()
      .then(async categories => {
        const c = []
        for (const i in categories) {
          const purchases = await Purchase.find({ category: categories[i]._id }, 'price').lean()
          const total = purchases.reduce((total, el) => (total + el.price), 0)
          console.log(total)
          c.push({ ...categories[i], total })
        }
        return res.send(c)
      })
      .catch(e => res.send([]))
  }
}

const INSERT_CATEGORY = async (req: Request, res: Response) : Promise<Response> => {
  const { name, percentage } = req.body

  try {
    existOrError(name, 'Por favor, informe o nome da categoria!')
    isPercentageOrError(percentage, 'A porcentagem deve ser um número entre 0 e 10!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  Category
    .create({ name: name, percentage: percentage })
    .then(() => res.send(`Categoria ${name} adicionada!`))
    .catch(e => {
      console.log(e)
      res.status(500).send('Ocorreu algum erro, verifique se esta categoria já existe!')
    })
}

const UPDATE_CATEGORY = async (req: Request, res: Response) : Promise<Response> => {
  const { id } = req.params
  const { name, percentage } = req.body

  try {
    isObjectIdOrError(id, 'ID não parece ser um ObjectID válido!')
    existOrError(name, 'Por favor, informe o novo nome da categoria!')
    isPercentageOrError(percentage, 'A porcentagem deve ser um número entre 0 e 10!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  Category
    .updateOne({ _id: id }, { name, percentage })
    .then(() => res.send(`Categoria ${name} atualizada!`))
    .catch(() => res.status(500).send('Ocorreu algum erro!'))
}

const DELETE_CATEGORY = async (req: Request, res: Response) : Promise<Response> => {
  const { id } = req.params

  try {
    isObjectIdOrError(id, 'ID não parece ser um ObjectID válido!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  Category
    .deleteOne({ _id: id })
    .then(() => res.send(`Categoria ${id} deletada!!`))
    .catch(() => res.status(500).send('Ocorreu algum erro!'))
}

export default {
  GET_CATEGORY,
  INSERT_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
}