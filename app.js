const express = require('express')
const app = express()
const path = require('path');
const port = process.env.PORT || 3000
nodeMailer = require('nodemailer') 
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

// socket connection implementation
const server = require('http').createServer(app)
const io = require('socket.io')( server, { cors: { origin: '*'}})

// the username of this player should be obtained from the database since he/she is the user of the web page

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/index', function (req, res) {
  res.render('index');
});
app.post('/send-email', function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'itchiraira@gmail.com',
      pass: 'dwty fijt wyqs ufle'
    }
  });
  let mailOptions = {
    from: '"worldlegroup16" <xx@gmail.com>', // sender address
    to: req.body.to, // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.body, // plain text body
    html: '<b>Invitation to play</b>' // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    // console.log('Message %s sent: %s', info.messageId, info.response);
    res.render('multiplayer');
  });
});

let UsersConnectedToserver = []
let addedUsers = [];
let userIDs = [];
let playersFromTheDatabase = [
  'bree',
  'courage',
  'cor',
  'yyy',
  'thando',
  'software3'
];
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs')

app.get('/multiplayer', (req, res)=>{
    res.render('multiplayer')
})

server.listen(port, () =>{
    console.log('running.....')
})

const checkAddedUsers = function(listOfUsers, username, userId){
  let result = false;
  listOfUsers.forEach( element => {
    if(element.name === username && String(element.id) === String(userId)){
      result = true;
    } 
  })
  return result
}

const getIndex = function(data, username, userId){
  let index = -1;
  let n = 0;
  data.forEach( element =>{
    if(element.name === username && String(element.id) === String(userId)){
      index = n;
    }
    n++;
  })
  return index;
}
io.on('connection', (socket)=>{

    // this should contain the room where the message is sent and the person that sent it
    socket.on('message', (data) =>{
       for(let i = 0; i < addedUsers.length; i++){

         if(checkAddedUsers(addedUsers, data[0], data[1]))
          if(String(addedUsers[i].name) !== String(data[0]) && String(addedUsers[i].id) === String(data[1])){
             io.to(userIDs[UsersConnectedToserver.indexOf(addedUsers[i].name)]).emit('message', data[2]);
          }
      }
    })

    // this should contain the username of the person connecting to the server or refreshed his/her web page
    socket.on('update', (data) =>{
      
      if(!UsersConnectedToserver.includes(data)){
        UsersConnectedToserver.push(data);
        userIDs[UsersConnectedToserver.indexOf(data)] = socket.id
        io.to(userIDs[UsersConnectedToserver.indexOf(data)]).emit('update', UsersConnectedToserver.indexOf(data));
      } else
      userIDs[UsersConnectedToserver.indexOf(data)] = socket.id

    })

    // this should contain the name of the person joining and the person inviting so that the joiner can join the group id
    socket.on('join', (data) =>{

      let usersInTheGroup = []

      if(!UsersConnectedToserver.includes(data[0])){
        UsersConnectedToserver.push(data[0]);
      }

      if(!checkAddedUsers(addedUsers, data[1], data[2])){
        addedUsers.push({name: data[1], id: data[2]})
      }

      if(!checkAddedUsers(addedUsers, data[0], data[2])){
        addedUsers.push({name: data[0], id: data[2]});
        for(let i = 0; i < addedUsers.length; i++){
          if(String(addedUsers[i].id) === String(data[2])) usersInTheGroup.push(String(addedUsers[i].name));
        }
        for(let i = 0; i < addedUsers.length; i++){

          if( String(addedUsers[i].id) === String(data[2])){
            let text = ''
            if(String(addedUsers[i].name) === String(data[0])){
              text = ' you have successfully joined the game room'
            }else text = ' successfully joined the game room'
            io.to(userIDs[UsersConnectedToserver.indexOf(addedUsers[i].name)]).emit('join', [data[0], usersInTheGroup, text]);
          }
      }
      }  
    })

    // this should let someone know whenever they get an invite// data[1] is the person inviting
    socket.on('invite', (data) =>{
      if(playersFromTheDatabase.includes(data[0])){

        if(UsersConnectedToserver.includes(data[0]) && !checkAddedUsers(addedUsers, data[0], data[2])){
          io.to(userIDs[UsersConnectedToserver.indexOf(data[0])]).emit('invite', [data[1], data[2]]);
        } 
        if(!UsersConnectedToserver.includes(data[0])){
          io.to(userIDs[UsersConnectedToserver.indexOf(data[1])]).emit('userNotConnected',data[0]);
        } 
      }
      else io.to(userIDs[UsersConnectedToserver.indexOf(data[1])]).emit('userNotFound',data[0]);
    })

    // the user should be able to leave the game room
    socket.on('leave', (data) =>{

      if(checkAddedUsers(addedUsers, data[0], data[1]) && String(data[1]) === String(UsersConnectedToserver.indexOf(data[0]))){
        let host_selected = false;
        let host_name = data[0];
        let user_ = UsersConnectedToserver.indexOf(data[0]);
        for(let i = 0; i < addedUsers.length; i++){
          
          if(String(addedUsers[i].id) === String(data[1])){
            
            if(String(addedUsers[i].name) === String(data[0])){
              io.to(userIDs[UsersConnectedToserver.indexOf(addedUsers[i].name)]).emit('resetId', data[1]);
              io.to(userIDs[UsersConnectedToserver.indexOf(addedUsers[i].name)]).emit('hostMsg');
              continue;
            }
            else if(!host_selected){
              user_ = UsersConnectedToserver.indexOf(addedUsers[i].name);
              host_name = addedUsers[i].name;
              host_selected = true;
            }
            io.to(userIDs[UsersConnectedToserver.indexOf(addedUsers[i].name)]).emit('hostLeft', [data[0], host_name]);
            io.to(userIDs[UsersConnectedToserver.indexOf(addedUsers[i].name)]).emit('resetId', user_);
            addedUsers[i].id = user_;
          }
       }
      }
      else if(checkAddedUsers(addedUsers, data[0], data[1])){
        let index = getIndex(addedUsers ,data[0], data[1]);
        let firstPieceOfUsers = addedUsers.slice(0, index);
        let secondPieceOfUsers = addedUsers.slice(index + 1, addedUsers.length);
        let user_ = UsersConnectedToserver.indexOf(data[0]);

        for(let i = 0; i < addedUsers.length; i++){
           if(String(addedUsers[i].id) === String(data[1])){
             if(String(addedUsers[i].name) === String(data[0])){
              io.to(userIDs[UsersConnectedToserver.indexOf(data[0])]).emit('resetId', user_);
              io.to(userIDs[UsersConnectedToserver.indexOf(data[0])]).emit('leave', data[0]);
             }
            else io.to(userIDs[UsersConnectedToserver.indexOf(addedUsers[i].name)]).emit('leave', data[0]);
           }
        }
        addedUsers.length = 0;
        // removes one user from the game room
        if(firstPieceOfUsers.length !== 0){
          addedUsers = addedUsers.concat(firstPieceOfUsers);
        }

        if(secondPieceOfUsers.length !== 0){
          addedUsers = addedUsers.concat(secondPieceOfUsers);
        }
      }
    });

    // if the invite has been declined
    socket.on('decline', (data) =>{
      
      if(!checkAddedUsers(addedUsers, data[0], data[2])){
        let monitor_ = false;
        for(let i = 0; i < addedUsers.length; i++){
          if(String(addedUsers[i].name) !== String(data[0]) && String(addedUsers[i].id) === String(data[1])){
            monitor_ = true;
            io.to(userIDs[UsersConnectedToserver.indexOf(addedUsers[i].name)]).emit('decline', data[0]);
          }
       }
       if(!monitor_) io.to(userIDs[UsersConnectedToserver.indexOf(UsersConnectedToserver[data[1]])]).emit('decline', data[0]);
      }
    })
})

//instructions

////  Reset password
app.use(express.static(__dirname + '/public'));
app.get('/verify_user', (req, res) => {
  const index = path.join(__dirname, 'views', 'verify_user.html');
  res.sendFile(index);
});

app.use(express.static(__dirname + '/public'));
app.get('/reset_password', (req, res) => {
  const index = path.join(__dirname, 'views', 'reset_password.html');
  res.sendFile(index);
});
////

//screen
app.use(express.static(__dirname + '/public'));
app.get('/screen', (req, res) => {
  const index = path.join(__dirname, 'views', 'screen.html');
  res.sendFile(index);
});

//player_mode
app.use(express.static(__dirname + '/public'));
app.get('/player_mode', (req, res) => {
  const index = path.join(__dirname, 'views', 'player_mode.html');
  res.sendFile(index);
});

//Login
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  const index = path.join(__dirname, 'views', 'signin.html');
  res.sendFile(index);
});


//login
app.use(express.static(__dirname + '/public'));
app.post('/', async (req, res) => {
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


//app.listen(port, () => {
  //console.log('Express server running on port', port)
//})

// verify user 

app.use(express.static(__dirname + '/public'));
app.get('/verify_user', (req, res) => {
  const index = path.join(__dirname, 'views', 'verify_user.html');
  res.sendFile(index);
});

app.use(express.static(__dirname + '/public'));
app.post('/verify_user', async (req, res) => {
  const { username } = req.body
  const user = await User.findOne({ username }).lean()

  if (!user) {
    return res.json({ status: 'error', error: 'username does not exist' })
  }

  if (await username == user.username) {
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

  res.json({ status: 'error', error: 'username does not exist' })
})


//ResetPassword
app.use(express.static(__dirname + '/public'));
app.post('/reset_password', async (req, res) => {
  const { token, newpassword: plainTextPassword } = req.body

  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password' })
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: 'error',
      error: 'Password too small. Should be atleast 6 characters'
    })
  }

  try {
    const user = jwt.verify(token, JWT_SECRET)

    const _id = user.id

    const password = await bcrypt.hash(plainTextPassword, 10)

    await User.updateOne(
      { _id },
      {
        $set: { password }
      }
    )

    res.json({ status: 'ok' })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: ';))' })
  }
})