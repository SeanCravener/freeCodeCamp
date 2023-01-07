const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

// Mongoose Setup
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Body Parser Setup
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: 'false' }));
app.use(bodyParser.json());

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  }, 
  count: {
    type: Number,
    default: 0
  }
})

const User = mongoose.model('User', userSchema)

// Exercise Schema
const exerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date
  }
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

// GET display all users
app.get('/api/users', (req, res) => {
  console.log('GET display users - start')
  
  User.find({}).exec((err, users) => {
    if (err) return console.error(err)
    res.send(users.map((user) => {
      return { 'username': user.username, '_id': user._id }
    }))
  })
  
  console.log('GET display users - end')
  
})

// POST add user
app.post('/api/users', (req, res) => {
  console.log('POST add user - start')

  console.log(req.body.username)
  let newUser = new User({
    username: req.body.username
  })

  newUser.save((err, user) => {
    if (err) return console.error(err)
    console.log('POST add user - successful')
    console.log(user)
    res.send({ username: newUser.username, _id: newUser._id })
    console.log('POST add user - end')
    res.end()
  })
})

// POST add exercise
app.post('/api/users/:_id/exercises', (req, res) => {
  console.log('POST add exercise - start')
  try {
  let date = req.body.date ? new Date(req.body.date) : new Date()
  console.log(date)
  let exercise = new Exercise({
    user: mongoose.Types.ObjectId(req.params._id),
    description: req.body.description,
    duration: req.body.duration,
    date: date
  })
  
  exercise.save((err, exer) => {
    if (err) return console.error(err)
    console.log('POST add exercise - successful')
    console.log(exer)
    User.findOneAndUpdate({ _id: req.params._id}, { $inc: { count: 1 }}, { new: true }, (err, data) => {
      if (err) return console.error(err)
      console.log('POST add exercise to array - successful')
      console.log(data)
      res.send({ 'username': data.username, 'description': exer.description, 'duration': exer.duration, 'date': exer.date.toDateString(), '_id': req.params._id })
    })
  })
  } catch (error) {
    console.error(error)
    res.send({ 'Error': 'POST error adding exercise'})
  }
  console.log('POST add exercise - end')
})

app.get('/api/users/:_id/logs', (req, res) => {
  console.log('GET view logs - start')
  try {
  let from = req.query.from ? new Date(req.query.from) : new Date(0)

  let to = req.query.to ? new Date(req.query.to) : new Date()

  Exercise.find({ user: req.params._id, date: { $gte: from, $lte: to }}, 'description duration date')
    .limit(req.query.limit)
    .exec((err, logs) => {
      if(err) return console.error(err)
      User.findOne({ _id: req.params._id }, 'username count _id')
        .exec((err, user) => {
          if(err) return console.error(err)
          res.send({ 
            'username': user.username,
            'count': user.count, 
            '_id': user._id, 
            'log': logs.map(x => {
              return {
                'description': x.description,
                'duration': x.duration,
                'date': x.date.toDateString()
              }
            })})
        })
    })
  } catch(error) {
    console.error(error)
    res.send({ 'Error': 'Error getting logs' })
  }
  console.log('GET view logs - end')
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})



