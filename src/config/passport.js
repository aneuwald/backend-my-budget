const mongoose = require('mongoose')
const User = mongoose.model('User')
const Passport = require('passport').Passport
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const bcrypt = require('bcrypt')

const passport = new Passport()

const params = {
    secretOrKey: process.env.AUTH_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
const strategy = new Strategy(params, (payload, done) => {
    User.findOne({ _id: payload.id })
        .then(user => done(null, user))
        .catch(err => done(err, false))
})

passport.use(strategy)

module.exports = () => passport.authenticate('jwt', { session: false })