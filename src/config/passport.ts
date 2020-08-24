import { Strategy, ExtractJwt } from 'passport-jwt'
import { Passport } from 'passport'

import { User } from '../models'

const passport = new Passport()

const params = {
  secretOrKey: process.env.URL_MONGODB as string,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(params, (payload, done) => {
  User.findOne({ _id: payload.id })
    .then(user => done(null, user))
    .catch(err => done(err, false))
})

passport.use(strategy)

export default {
  passport: passport,
  authenticate: passport.authenticate('jwt', { session: false })
}
