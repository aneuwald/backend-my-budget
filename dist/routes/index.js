"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _categories = require('../api/categories'); var _categories2 = _interopRequireDefault(_categories);
var _purchases = require('../api/purchases'); var _purchases2 = _interopRequireDefault(_purchases);
var _relations = require('../api/relations'); var _relations2 = _interopRequireDefault(_relations);
var _passport = require('../config/passport'); var _passport2 = _interopRequireDefault(_passport);
var _express = require('express');

var _auth = require('../config/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = _express.Router.call(void 0, )

routes.route('/')
  .get((req, res) => {
    res.status(200).send('WELCOME TO MYBUDGET API!')
  })

routes.route('/login')
  .get(_passport2.default.authenticate, (req, res) => res.send('Você está autenticado, parabéns!'))
  .post(_auth2.default)

routes.route('/categories/purchases')
  .get(_relations2.default.GET_CATEGORIES_COMPLETE)

routes.route('/categories/purchases/:id')
  .get(_relations2.default.GET_PURCHASES_BY_CATEGORY)

routes.route('/categories/:id?')
  .get(_categories2.default.GET_CATEGORY)
  .post(_categories2.default.INSERT_CATEGORY)
  .put(_categories2.default.UPDATE_CATEGORY)
  .delete(_categories2.default.DELETE_CATEGORY)

routes.route('/purchases/:id?')
  .get(_purchases2.default.GET_PURCHASE)
  .post(_purchases2.default.INSERT_PURCHASE)
  .put(_purchases2.default.UPDATE_PURCHASE)
  .delete(_purchases2.default.DELETE_PURCHASE)

exports. default = routes
