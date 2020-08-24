"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _validation = require('../config/validation');

var _models = require('../models');

const GET_PURCHASE = async (req, res) => {
  const { id } = req.params

  try {
    id && _validation.isObjectIdOrError.call(void 0, id, 'ID não parece um ser ObjectID válido!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  if (id) {
    return _models.Purchase.findOne({ _id: id }).populate('category').lean()
      .then(c => res.send(c))
      .catch(() => res.send({}))
  } else {
    return _models.Purchase.find().populate('category').lean()
      .then(c => res.send(c))
      .catch(() => res.send([]))
  }
}

const INSERT_PURCHASE = async (req, res) => {
  const { name, price, description, date, category } = req.body

  try {
    _validation.existOrError.call(void 0, name, 'Por favor, informe o nome da compra categoria!')
    _validation.isNumberOrError.call(void 0, price, 'O preço deve ser um número maior que 0!')
    _validation.isObjectIdOrError.call(void 0, category, 'ID da categoria não parece ser ObjectID válido!')
    _validation.existOrError.call(void 0, date, 'Por favor, informe a data da compra!')
    _validation.existOrError.call(void 0, await _models.Category.countDocuments({ _id: category }), 'Esse ID não parece ser de nenhuma categoria cadastrada!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  return _models.Purchase
    .create({ name, price, description, date, category })
    .then(() => res.send(`Compra ${name} adicionada!`))
    .catch(e => res.status(500).send('Ocorreu algum erro!'))
}

const UPDATE_PURCHASE = async (req, res) => {
  const { id } = req.params
  const { name, price, description, date, category } = req.body

  try {
    _validation.existOrError.call(void 0, name, 'Por favor, informe o nome da compra categoria!')
    _validation.isNumberOrError.call(void 0, price, 'O preço deve ser um número maior que 0!')
    _validation.isObjectIdOrError.call(void 0, category, 'ID da categoria não parece ser ObjectID válido!')
    // existOrError(date, 'Por favor, informe a data da compra!')
    _validation.existOrError.call(void 0, await _models.Category.countDocuments({ _id: category }), 'Esse ID não parece ser de nenhuma categoria cadastrada!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  return _models.Purchase
    .updateOne({ _id: id }, { name, price, description, date: Date.now() || date, category })
    .then(() => res.send(`Compra ${name} atualizada!`))
    .catch(() => res.status(500).send('Ocorreu algum erro!'))
}

const DELETE_PURCHASE = async (req, res) => {
  const { id } = req.params

  try {
    _validation.isObjectIdOrError.call(void 0, id, 'ID não parece ser um ObjectID válido!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  return _models.Purchase
    .deleteOne({ _id: id })
    .then(() => res.send(`Compra ${id} deletada!!`))
    .catch(() => res.status(500).send('Ocorreu algum erro!'))
}

exports. default = {
  GET_PURCHASE,
  INSERT_PURCHASE,
  UPDATE_PURCHASE,
  DELETE_PURCHASE
}
