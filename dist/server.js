"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('./config/env');
var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

const PORT = process.env.PORT || 4001

_app2.default.listen(PORT, () => {
  console.log(`Servidor funcionando na porta http://localhost:${process.env.PORT}`)
})
