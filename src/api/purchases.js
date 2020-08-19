const mongoose = require('mongoose')
const Purchase = mongoose.model('Purchase')


const GET_PURCHASE = async (req, res) => {
    const { id } = req.params
    if (id)
        return res.send(`PEGOU A COMPRA ${id}`)
    else
        return res.send('PEGOU TODAS AS COMPRAS!')
}

const INSERT_PURCHASE = async (req, res) => {
    res.send('INSERIU UMA COMPRA')
}

const DELETE_PURCHASE = async (req, res) => {
    const { id } = req.body
    res.send(`ATUALIZOU A COMPRA ${id}`)
}

const UPDATE_PURCHASE = async (req, res) => {
    const { id } = req.params
    res.send(`DELETOU A COMPRA ${id}`)
}

module.exports = {
    GET_PURCHASE,
    INSERT_PURCHASE,
    DELETE_PURCHASE,
    UPDATE_PURCHASE
}
