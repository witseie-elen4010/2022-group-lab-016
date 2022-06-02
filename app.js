const express = require('express')
const app = express()
const path = require('path');
const port = process.env.PORT || 3001

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
app.use(express.static(__dirname + '/models'));
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

mongoose.connect("mongodb+srv://Tadiwa:test123@cluster0.vlabe.mongodb.net/Cluster0?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})

  .then(() => {
    console.log("connected to db")
  })
  .catch((err) => {
    console.log(err)
  });


app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())



app.get('/', (request, response) => {
  return response.send('Hello devs, this is our root endpoint')
})


//instructions
//Login

//screen
app.use(express.static(__dirname + '/public'));
app.get('/screen', (req, res) => {
  const index = path.join(__dirname, 'views', 'screen.html');
  res.sendFile(index);
});

//Login
app.use(express.static(__dirname + '/public'));
app.get('/signin', (req, res) => {
  const index = path.join(__dirname, 'views', 'signin.html');
  res.sendFile(index);
});


//login
app.use(express.static(__dirname + '/public'));
app.post('/signin', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username }).lean()

  if (!user) {
    return res.json({ status: 'error', error: 'Invalid username/password' })
  }

  if (await bcrypt.compare(password, user.password)) {
    // the username, password combination is successful

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username
      },
      JWT_SECRET
    )

    return res.json({ status: 'ok', data: token })
  }

  res.json({ status: 'error', error: 'Invalid username/password' })
})




//SignUp
app.use(express.static(__dirname + '/public'));
app.get('/signup', (req, res) => {
  const index = path.join(__dirname, 'views', 'signup.html');
  res.sendFile(index);
});

app.use(express.static(__dirname + '/public'));
app.post('/signup', async (req, res) => {
  const { username, password: plainTextPassword } = req.body

  if (!username || typeof username !== 'string') {
    return res.json({ status: 'error', error: 'Invalid username' })
  }

  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password' })
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: 'error',
      error: 'Password too small. Should be atleast 6 characters'
    })
  }

  const password = await bcrypt.hash(plainTextPassword, 10)

  try {
    const response = await User.create({
      username,
      password
    })
    console.log('User created successfully: ', response)
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: 'error', error: 'Username already in use' })
    }
    throw error
  }

  res.json({ status: 'ok' })
})



app.listen(port, () => {
  console.log('Express server running on port', port)
})