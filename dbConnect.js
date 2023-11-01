const mongoose = require('mongoose')

const connect = mongoose.connect('mongodb+srv://kalanadias:Kalana123@cluster0.ewbh7py.mongodb.net/finance_management', { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection

connection.on('error', err => console.log(err))
connection.on('connected', () => console.log('Mongo DB connection successful!'))