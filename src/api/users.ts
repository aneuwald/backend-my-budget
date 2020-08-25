import { Request, Response } from 'express'

import { isNumberOrError } from '../config/validation'
import { User } from '../models'

const GET_BUDGET = async (req: Request, res: Response): Promise<Response> => {
  // const { user } = req
  const user = await User.findOne({ username: 'lgrando' })
  return res.send({ budget: user.budget })
}

const UPDATE_BUDGET = async (req: Request, res: Response): Promise<Response> => {
  const { body: { budget } } = req

  try {
    isNumberOrError(budget, 'O budget deve ser um número maior que 0!')
  } catch (msg) {
    return res.status(400).send(msg)
  }

  try {
    await User.updateOne({ username: 'lgrando' }, { budget: budget })
    return res.send('O budget foi atualizado com sucesso!')
  } catch {
    return res.status(500).send('Ocorreu algum errou ao atualizar o budget do usuário')
  }
}

export default {
  GET_BUDGET,
  UPDATE_BUDGET
}
