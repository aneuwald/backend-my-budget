import jwt from 'jwt-simple'
import bcrypt from 'bcrypt'

import { existOrError } from './validation'

import { User } from '../models'

const LOGIN = async (req, res) => {
  const { username, password } = req.body

  try {
    existOrError(username, 'Por favor, informe o username!')
    existOrError(password, 'Por favor, informe a senha!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  try {
    const user = await User.findOne({ username: username })
      .catch(err => new Error(err))
    if (!user) return res.status(401).json('Login ou senha inválidos')

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) return res.status(401).json('Login ou senha inválidos')

    const now = Math.floor(Date.now() / 1000)
    const payload = {
      id: user._id,
      iat: now,
      exp: now + 60 * 60 * 24 // 24horas
    }

    return res.status(200).send({
      user: user.username,
      token: jwt.encode(payload, process.env.AUTH_SECRET)
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json('Algo deu errado')
  }
}

export default LOGIN
