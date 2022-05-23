const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path');
const port = 5000




app.get('/', (request, response) => {
  return response.send('Hello devs, this is our root endpoint')
})

//screen
app.use(express.static(__dirname + '/public'));
app.get('/screen', (req, res) => {
  const index = path.join(__dirname, 'views', 'screen.html');
  res.sendFile(index);
});

//Login
app.use(express.static(__dirname + '/public'));
app.get('/login', (req, res) => {
  const index = path.join(__dirname, 'views', 'login.html');
  res.sendFile(index);
});

//SignUp
app.use(express.static(__dirname + '/public'));
app.get('/signup', (req, res) => {
  const index = path.join(__dirname, 'views', 'signup.html');
  res.sendFile(index);
});



app.listen(port, () => {
  console.log('App working fine')
})