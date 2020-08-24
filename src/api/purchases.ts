import { Request, Response } from 'express'
import { existOrError, isNumberOrError, isObjectIdOrError } from '../config/validation'

import { Category, Purchase } from '../models'

const GET_PURCHASE = async (req: Request, res: Response) : Promise<Response> => {
  const { id } = req.params

  try {
    id && isObjectIdOrError(id, 'ID não parece um ser ObjectID válido!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  if (id) {
    return Purchase.findOne({ _id: id }).populate('category').lean()
      .then(c => res.send(c))
      .catch(() => res.send({}))
  } else {
    return Purchase.find().populate('category').lean()
      .then(c => res.send(c))
      .catch(() => res.send([]))
  }
}

const INSERT_PURCHASE = async (req: Request, res: Response) : Promise<Response> => {
  const { name, price, description, date, category } = req.body

  try {
    existOrError(name, 'Por favor, informe o nome da compra categoria!')
    isNumberOrError(price, 'O preço deve ser um número maior que 0!')
    isObjectIdOrError(category, 'ID da categoria não parece ser ObjectID válido!')
    existOrError(date, 'Por favor, informe a data da compra!')
    existOrError(await Category.countDocuments({ _id: category }), 'Esse ID não parece ser de nenhuma categoria cadastrada!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  return Purchase
    .create({ name, price, description, date, category })
    .then(() => res.send(`Compra ${name} adicionada!`))
    .catch(e => res.status(500).send('Ocorreu algum erro!'))
}

const UPDATE_PURCHASE = async (req: Request, res: Response) : Promise<Response> => {
  const { id } = req.params
  const { name, price, description, date, category } = req.body

  try {
    existOrError(name, 'Por favor, informe o nome da compra categoria!')
    isNumberOrError(price, 'O preço deve ser um número maior que 0!')
    isObjectIdOrError(category, 'ID da categoria não parece ser ObjectID válido!')
    // existOrError(date, 'Por favor, informe a data da compra!')
    existOrError(await Category.countDocuments({ _id: category }), 'Esse ID não parece ser de nenhuma categoria cadastrada!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  return Purchase
    .updateOne({ _id: id }, { name, price, description, date: Date.now() || date, category })
    .then(() => res.send(`Compra ${name} atualizada!`))
    .catch(() => res.status(500).send('Ocorreu algum erro!'))
}

const DELETE_PURCHASE = async (req: Request, res: Response) : Promise<Response> => {
  const { id } = req.params

  try {
    isObjectIdOrError(id, 'ID não parece ser um ObjectID válido!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  return Purchase
    .deleteOne({ _id: id })
    .then(() => res.send(`Compra ${id} deletada!!`))
    .catch(() => res.status(500).send('Ocorreu algum erro!'))
}

export default {
  GET_PURCHASE,
  INSERT_PURCHASE,
  UPDATE_PURCHASE,
  DELETE_PURCHASE
}
