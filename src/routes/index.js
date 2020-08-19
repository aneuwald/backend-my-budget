const categories = require('../api/categories')
const purchases = require('../api/purchases')
const relations = require('../api/relations')

const routes = require('express').Router();

routes.route('/')
    .get((req, res) => {
        res.status(200).send('WELCOME TO MYBUDGET API, BITCH!');
    });

routes.route('/categories/purchases')
    .get(relations.GET_CATEGORIES_COMPLETE)

routes.route('/categories/purchases/:id')
    .get(relations.GET_PURCHASES_BY_CATEGORY)

routes.route('/categories/:id?')
    .get(categories.GET_CATEGORY)
    .post(categories.INSERT_CATEGORY)
    .put(categories.UPDATE_CATEGORY)
    .delete(categories.DELETE_CATEGORY)

routes.route('/purchases/:id?')
    .get(purchases.GET_PURCHASE)
    .post(purchases.INSERT_PURCHASE)
    .put(purchases.UPDATE_PURCHASE)
    .delete(purchases.DELETE_PURCHASE)

module.exports = routes;