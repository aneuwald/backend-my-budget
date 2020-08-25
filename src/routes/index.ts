import categories from '../api/categories'
import purchases from '../api/purchases'
import users from '../api/users'
import relations from '../api/relations'
import Passport from '../config/passport'
import { Router } from 'express'

import MakeLogin from '../config/auth'

const routes = Router()

routes.route('/')
  .get((req, res) => {
    res.status(200).send('WELCOME TO MYBUDGET API!')
  })

routes.route('/login')
  .get(Passport.authenticate, (req, res) => res.send('Você está autenticado, parabéns!'))
  .post(MakeLogin)

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

routes.route('/budget')
  // .all(Passport.authenticate)
  .get(users.GET_BUDGET)
  .post(users.UPDATE_BUDGET)

export default routes
