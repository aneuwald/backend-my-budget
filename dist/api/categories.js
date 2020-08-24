"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _validation = require('../config/validation');

var _models = require('../models');

const GET_CATEGORY = async (req, res) => {
  const { id } = req.params

  try {
    id && _validation.isObjectIdOrError.call(void 0, id, 'ID não parece um ser ObjectID válido!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  try {
    if (id) {
      const category = await _models.Category.findOne({ _id: id })
      return res.send(category)
    } else {
      const categories = await _models.Category.find().lean()
      const c = []
      for (const i in categories) {
        const purchases = await _models.Purchase.find({ category: categories[i]._id }, 'price').lean()
        const total = purchases.reduce((total, el) => (total + el.price), 0)
        c.push({ ...categories[i], total })
      }
      return res.send(c)
    }
  } catch (e) {
    return res.status(500).send('Ocorreu algum problema.')
  }
}

const INSERT_CATEGORY = async (req, res) => {
  const { name, percentage } = req.body

  try {
    _validation.existOrError.call(void 0, name, 'Por favor, informe o nome da categoria!')
    _validation.isPercentageOrError.call(void 0, percentage, 'A porcentagem deve ser um número entre 0 e 10!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  return _models.Category
    .create({ name: name, percentage: percentage })
    .then(() => res.send(`Categoria ${name} adicionada!`))
    .catch(() => res.status(500).send('Ocorreu algum erro, verifique se esta categoria já existe!'))
}

const UPDATE_CATEGORY = async (req, res) => {
  const { id } = req.params
  const { name, percentage } = req.body

  try {
    _validation.isObjectIdOrError.call(void 0, id, 'ID não parece ser um ObjectID válido!')
    _validation.existOrError.call(void 0, name, 'Por favor, informe o novo nome da categoria!')
    _validation.isPercentageOrError.call(void 0, percentage, 'A porcentagem deve ser um número entre 0 e 10!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  return _models.Category
    .updateOne({ _id: id }, { name, percentage })
    .then(() => res.send(`Categoria ${name} atualizada!`))
    .catch(() => res.status(500).send('Ocorreu algum erro!'))
}

const DELETE_CATEGORY = async (req, res) => {
  const { id } = req.params

  try {
    _validation.isObjectIdOrError.call(void 0, id, 'ID não parece ser um ObjectID válido!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  return _models.Category
    .deleteOne({ _id: id })
    .then(() => res.send(`Categoria ${id} deletada!!`))
    .catch(() => res.status(500).send('Ocorreu algum erro!'))
}

exports. default = {
  GET_CATEGORY,
  INSERT_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
}
