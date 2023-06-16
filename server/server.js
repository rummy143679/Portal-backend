const express = require('express')
const mongoose = require('mongoose')
// const mongoose = require('mongoose')
const cors = require('cors')
const url = 'mongodb://127.0.0.1:27017/myportaldb' 
const studentsRouter = require('./router/studentsRouter')


const app  = express()

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const con = mongoose.connection

con.on('open', () => console.log('mongodb connected successfull....!'))

app.use(cors({
  origin: 'http://localhost:3000' // Replace with your front-end URL
}));
  
app.use(express.json())

app.use('/students', studentsRouter) 

app.listen(9000, () => {
    console.log('connected to server on port 9000')
})

