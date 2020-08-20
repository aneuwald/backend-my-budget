const express = require('express')
const app = express()

require('./config/db')
require('./config/passport')

app.use(express.json())

const routes = require("./routes")
app.use('/', routes)
app.use('/m', require("./config/m"))

module.exports = app