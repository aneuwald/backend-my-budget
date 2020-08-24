"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _jwtsimple = require('jwt-simple'); var _jwtsimple2 = _interopRequireDefault(_jwtsimple);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _validation = require('./validation');

var _models = require('../models');

const LOGIN = async (req, res) => {
  const { username, password } = req.body

  try {
    _validation.existOrError.call(void 0, username, 'Por favor, informe o username!')
    _validation.existOrError.call(void 0, password, 'Por favor, informe a senha!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  try {
    const user = await _models.User.findOne({ username: username })
    if (!user) { return res.status(401).json('Login ou senha inválidos') }

    const isMatch = _bcrypt2.default.compareSync(password, user.password)
    if (!isMatch) { return res.status(401).json('Login ou senha inválidos') }

    const now = Math.floor(Date.now() / 1000)
    const payload = {
      id: user._id,
      iat: now,
      exp: now + 60 * 60 * 24 // 24horas
    }

    return res.status(200).send({
      user: user.username,
      token: _jwtsimple2.default.encode(payload, process.env.AUTH_SECRET )
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json('Algo deu errado')
  }
}

exports. default = LOGIN
