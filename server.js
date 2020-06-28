const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')
const keys = require('./config/keys')
const indexRouter = require('./routes/index')

//view engine
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const dbURI = keys.dbURI;
const conn = async () => {
  try{
    const result = await mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    console.log('connected to db')
    app.listen(process.env.PORT || 3000, console.log('listening on port 3000'));
  }catch(err){
    console.log(err)
  }
};
conn()

app.use('/', indexRouter)

// app.listen(process.env.PORT || 3000, console.log('server is listening on port 3000'))