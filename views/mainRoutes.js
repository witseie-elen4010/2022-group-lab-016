

const path = require('path')
const express = require('express')
const app = express()
const mainRouter = express.Router()
mainRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'login.html'))
})
//app.use(mainRouter)

mainRouter.use(express.static(__dirname + '/public'));
mainRouter.get('/login', (req, res) => {
  const index = path.join(__dirname, 'views', 'login.html');
  res.sendFile(index);
});

module.exports = mainRouter