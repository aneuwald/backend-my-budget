"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _passportjwt = require('passport-jwt');
var _passport = require('passport');

var _models = require('../models');

const passport = new (0, _passport.Passport)()

const params = {
  secretOrKey: process.env.URL_MONGODB ,
  jwtFromRequest: _passportjwt.ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new (0, _passportjwt.Strategy)(params, (payload, done) => {
  _models.User.findOne({ _id: payload.id })
    .then(user => done(null, user))
    .catch(err => done(err, false))
})

passport.use(strategy)

exports. default = {
  passport: passport,
  authenticate: passport.authenticate('jwt', { session: false })
}
