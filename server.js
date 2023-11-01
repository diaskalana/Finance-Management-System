const express = require('express')
const dbConnect = require('./dbConnect')
const app = express()
app.use(express.json())
const userRoute = require('./routes/usersRoute')
const transactionsRoute = require('./routes/transactionsRoute')


app.use('/api/users/', userRoute)
app.use('/api/transactions/', transactionsRoute)
const port = 5000

app.listen(port, () => console.log('Node JS server started at port: ' + port))