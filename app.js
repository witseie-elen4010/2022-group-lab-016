const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path');
const port = 3000



app.get('/', (request, response) => {
  return response.send('Hello devs, this is our root endpoint')
})

app.listen(port, () => {
  console.log('App working fine')
})