"use strict";

const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)

mongoose.connect(process.env.URL_MONGODB, { useNewUrlParser: true })
    .then(() => console.log('CONECTADO COM SUCESSO AO BANCO DE DADOS!'))
    .catch(() => console.log('ERRO AO SE CONECTAR COM O BANCO DE DADOS!'))

require('../models/Category')
require('../models/Purchase')
require('../models/User')