const mongoose = require('mongoose')
const MongoDB_URI = ''  //Enter your MongoDB URI here

const connect = mongoose.connect(MongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection

connection.on('error', err => console.log(err))
connection.on('connected', () => console.log('Mongo DB connection successful!'))