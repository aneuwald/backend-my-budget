const categoryAPI = require('../api/categories')
const purchaseAPI = require('../api/purchases')

const routes = require('express').Router();

routes.route('/')
    .get((req, res) => {
        res.status(200).send('WELCOME TO MYBUDGET API, BITCH!');
    });

routes.route('/categories/:id?')
    .get(categoryAPI.GET_CATEGORY)
    .post(categoryAPI.INSERT_CATEGORY)
    .put(categoryAPI.UPDATE_CATEGORY)
    .delete(categoryAPI.DELETE_CATEGORY)

routes.route('/purchases/:id?')
    .get(purchaseAPI.GET_PURCHASE)
    .post(purchaseAPI.INSERT_PURCHASE)
    .put(purchaseAPI.UPDATE_PURCHASE)
    .delete(purchaseAPI.DELETE_PURCHASE)

module.exports = routes;