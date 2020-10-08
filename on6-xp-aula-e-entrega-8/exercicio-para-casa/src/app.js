const express = require('express')
const app = express()

const router = require('./route/gamesRoute')
app.use('/jogos', router)
 
module.exports = app