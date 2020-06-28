

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const keys = require('./config/keys')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

//view engine
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit:'10mb', extended: false}))

const mongoose = require('mongoose')
const dbURI = keys.dbURI;
const conn = async () => {
  try{
    const result = await mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    console.log('connected to db')
    app.listen(3000,console.log('listening on port 3000'));
  }catch(err){
    console.log(err)
  }
};
conn()


// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

// app.listen(process.env.PORT || 3000, console.log('server is listening on port 3000'))