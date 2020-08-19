require('dotenv').config()

const app = require('./src/app')

const PORT = process.env.PORT || 4001

app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta http://localhost:${process.env.PORT}`)
})