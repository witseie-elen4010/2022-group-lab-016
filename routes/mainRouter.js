'use strict'

const path = require('path')
const express = require('express')
const app = express()
const mainRouter = express.Router()
mainRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'signin.html'))
})
app.use(mainRouter)

module.exports = mainRouter
