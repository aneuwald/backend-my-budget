"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _validation = require('../config/validation');

var _models = require('../models');

const GET_PURCHASES_BY_CATEGORY = async (req, res) => {
  const { id } = req.params

  try {
    _validation.isObjectIdOrError.call(void 0, id, 'ID não parece um ser ObjectID válido!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  return _models.Purchase.find({ category: id }).lean()
    .then(c => res.send(c))
    .catch(() => res.send('Algo deu errado!'))
}

const GET_CATEGORIES_COMPLETE = async (req, res) => {
  const c = []
  const categories = await _models.Category.find().lean()
  for (const i in categories) {
    const purchases = await _models.Purchase.find({ category: categories[i]._id }, '-category').lean()
    const total = purchases.reduce((total, el) => (total + el.price), 0)
    c.push({ ...categories[i], total, purchases })
  }

  return res.send(c)
}

exports. default = {
  GET_PURCHASES_BY_CATEGORY,
  GET_CATEGORIES_COMPLETE
}
