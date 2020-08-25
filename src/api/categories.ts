import { Request, Response } from 'express'
import { existOrError, isPercentageOrError, isObjectIdOrError } from '../config/validation'

import { Category, Purchase } from '../models'

const GET_CATEGORY = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params

  try {
    id && isObjectIdOrError(id, 'ID não parece um ser ObjectID válido!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  const getTotal = async (id) => {
    const purchases = await Purchase.find({ category: id }, 'price').lean()
    return purchases.reduce((total, el) => (total + el.price), 0)
  }

  try {
    if (id) {
      const category = await Category.findById(id).lean()
      const c = { ...category, total: await getTotal(category._id) }
      return res.send(c)
    } else {
      const categories = await Category.find().lean()
      const c = []
      for (const cat of categories) {
        c.push({
          ...cat,
          total: await getTotal(cat._id)
        })
      }

      return res.send(c)
    }
  } catch (e) {
    console.log(e)
    return res.status(500).send('Ocorreu algum problema.')
  }
}

const INSERT_CATEGORY = async (req: Request, res: Response): Promise<Response> => {
  const { name, percentage } = req.body

  try {
    existOrError(name, 'Por favor, informe o nome da categoria!')
    isPercentageOrError(percentage, 'A porcentagem deve ser um número entre 0 e 10!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  return Category
    .create({ name: name, percentage: percentage })
    .then(() => res.send(`Categoria ${name} adicionada!`))
    .catch(() => res.status(500).send('Ocorreu algum erro, verifique se esta categoria já existe!'))
}

const UPDATE_CATEGORY = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const { name, percentage } = req.body

  try {
    isObjectIdOrError(id, 'ID não parece ser um ObjectID válido!')
    existOrError(name, 'Por favor, informe o novo nome da categoria!')
    isPercentageOrError(percentage, 'A porcentagem deve ser um número entre 0 e 10!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  return Category
    .updateOne({ _id: id }, { name, percentage })
    .then(() => res.send(`Categoria ${name} atualizada!`))
    .catch(() => res.status(500).send('Ocorreu algum erro!'))
}

const DELETE_CATEGORY = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params

  try {
    isObjectIdOrError(id, 'ID não parece ser um ObjectID válido!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  return Category
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
