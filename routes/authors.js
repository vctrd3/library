const Author = require('../models/author')

const router = require('express').Router()

//all authors route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if(req.query.name != null && req.query.name !== ''){
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try{
    const authors = await Author.find(searchOptions)
    res.render('authors/index', {authors, searchOptions: req.query})
  } catch(err){
    res.redirect('/')
  }
})

//new author route
router.get('/new', (req,res) => {
  res.render('authors/new', { author: new Author()})
})

//create author route
router.post('/', async (req,res) => {
  const author = new Author({
    name: req.body.name
  })
  try{
    const result = await author.save()
    //res.redirect(`authors/${newAuthor.id}`)
    res.redirect('/authors')
    
  }catch(err){
    //console.log(err)
    let locals= {errorMessage:'Error creating author'};
    res.render('authors/new',{
      author:author,
      locals
    })
  }
})


module.exports = router