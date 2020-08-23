import './config/env'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import Passport from './config/passport'
import routes from './routes'
import m from './config/m'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(Passport.passport.initialize())
  }

  private database (): void {
    mongoose.set('useCreateIndex', true)
    mongoose.set('useUnifiedTopology', true)
    mongoose.connect(process.env.URL_MONGODB, { useNewUrlParser: true })
      .then(() => console.log('CONECTADO COM SUCESSO AO BANCO DE DADOS!'))
      .catch(() => console.log('ERRO AO SE CONECTAR COM O BANCO DE DADOS!'))
  }

  private routes (): void {
    this.express.use('/', routes)
    this.express.use('/', m)
  }
}

export default new App().express
