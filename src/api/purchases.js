const mongoose = require('mongoose')
const Category = mongoose.model('Category')
const Purchase = mongoose.model('Purchase')

const {
    existOrError,
    isNumberOrError,
    isObjectIdOrError
} = require('../config/validation')

const GET_PURCHASE = async (req, res) => {
    const { id } = req.params

    try {
        id && isObjectIdOrError(id, 'ID não parece um ser ObjectID válido!')
    } catch (msg) {
        return res.status(400).send(msg)
    }

    if (id)
        Purchase.findOne({ _id: id }).populate('category').lean()
            .then(c => res.send(c))
            .catch(e => res.send({}))
    else
        Purchase.find().populate('category').lean()
            .then(c => res.send(c))
            .catch(e => res.send([]))
}

const INSERT_PURCHASE = async (req, res) => {
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

    Purchase
        .create({ name, price, description, date, category })
        .then(() => res.send(`Compra ${name} adicionada!`))
        .catch(e => {
            console.log(e)
            res.status(500).send('Ocorreu algum erro!')
        })
}

const UPDATE_PURCHASE = async (req, res) => {
    const { id } = req.params
    const { name, price, description, date, category } = req.body

    try {
        existOrError(name, 'Por favor, informe o nome da compra categoria!')
        isNumberOrError(price, 'O preço deve ser um número maior que 0!')
        isObjectIdOrError(category, 'ID da categoria não parece ser ObjectID válido!')
        //existOrError(date, 'Por favor, informe a data da compra!')
        existOrError(await Category.countDocuments({ _id: category }), 'Esse ID não parece ser de nenhuma categoria cadastrada!')
    } catch (msg) {
        return res.status(400).send(msg)
    }

    Purchase
        .updateOne({ _id: id }, { name, price, description, date: Date.now(), category })
        .then(() => res.send(`Categoria ${name} atualizada!`))
        .catch(() => res.status(500).send('Ocorreu algum erro!'))
}

const DELETE_PURCHASE = async (req, res) => {
    const { id } = req.params

    try {
        isObjectIdOrError(id, 'ID não parece ser um ObjectID válido!')
    } catch (msg) {
        return res.status(400).send(msg)
    }

    Purchase
        .deleteOne({ _id: id })
        .then(() => res.send(`Compra ${id} deletada!!`))
        .catch(() => res.status(500).send('Ocorreu algum erro!'))
}


module.exports = {
    GET_PURCHASE,
    INSERT_PURCHASE,
    DELETE_PURCHASE,
    UPDATE_PURCHASE
}
