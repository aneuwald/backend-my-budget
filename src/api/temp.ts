import { Request, Response } from 'express'
import { Temp } from '../models'

const GET_TEMPS = async (req: Request, res: Response): Promise<Response> => {
  return Temp.find().lean()
    .then(c => res.send(c))
    .catch(() => res.send('Algo deu errado ao buscar!'))
}

const INSERT_TEMP = async (req: Request, res: Response): Promise<Response> => {
  const { temp, umid } = req.body
  return Temp.create({ temp, umid })
    .then(c => res.send(c))
    .catch(() => res.send('Algo deu errado ao criar!'))
}

export default {
  INSERT_TEMP,
  GET_TEMPS
}
