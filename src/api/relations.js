const mongoose = require('mongoose')
const Category = mongoose.model('Category')
const Purchase = mongoose.model('Purchase')

const {
    isObjectIdOrError
} = require('../config/validation')

const GET_PURCHASES_BY_CATEGORY = async (req, res) => {
    const { id } = req.params

    try {
        isObjectIdOrError(id, 'ID não parece um ser ObjectID válido!')
    } catch (msg) {
        return res.status(400).send(msg)
    }

    Purchase.find({ category: id }).lean()
        .then(c => res.send(c))
        .catch(e => res.send('Algo deu errado!'))

}

const GET_CATEGORIES_COMPLETE = async (req, res) => {
    const c = []
    const categories = await Category.find().lean()
    for (i in categories) {
        const purchases = await Purchase.find({ category: categories[i]._id }, '-category').lean()
        const total = purchases.reduce((a, b) => a.price + b.price, 0) || 0
        c.push({ ...categories[i], total, purchases })
    }

    return res.send(c)
}

module.exports = {
    GET_PURCHASES_BY_CATEGORY,
    GET_CATEGORIES_COMPLETE
}
