"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('./config/passport'); var _passport2 = _interopRequireDefault(_passport);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _m = require('./config/m'); var _m2 = _interopRequireDefault(_m);

class App {
  

   constructor () {
    this.express = _express2.default.call(void 0, )

    this.middlewares()
    this.database()
    this.routes()
  }

   middlewares () {
    this.express.use(_express2.default.json())
    this.express.use(_cors2.default.call(void 0, ))
    this.express.use(_passport2.default.passport.initialize())
  }

   database () {
    _mongoose2.default.set('useCreateIndex', true)
    _mongoose2.default.set('useUnifiedTopology', true)
    _mongoose2.default.connect(process.env.URL_MONGODB , { useNewUrlParser: true })
      .then(() => console.log('CONECTADO COM SUCESSO AO BANCO DE DADOS!'))
      .catch(() => console.log('ERRO AO SE CONECTAR COM O BANCO DE DADOS!'))
  }

   routes () {
    this.express.use('/', _routes2.default)
    this.express.use('/', _m2.default)
  }
}

exports. default = new App().express
