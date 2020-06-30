const Author = require('../models/author')
const Book = require('../models/book')
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
    const newAuthor = await author.save()
    res.redirect(`authors/${newAuthor.id}`)
    
    
  }catch(err){
    //console.log(err)
    let locals= {errorMessage:'Error creating author'};
    res.render('authors/new',{
      author:author,
      locals
    })
  }
})

router.get('/:id', async (req,res) => {
  try{
    const author = await Author.findById(req.params.id)
    const books = await Book.find({ author: author.id}).limit(6).exec()
    res.render('authors/show', {
      author: author,
      booksByAuthor: books
    })
  } catch {
    res.redirect('/')
  }
 
})

router.get('/:id/edit', async (req, res) => {
  try{
    const id = req.params.id
    const author = await Author.findById(id)
    res.render('authors/edit', { author: author })
  }catch(err){
    console.log(err)
    res.redirect('/authors')
  }
})



//use method-override to make put delete request from browser
router.put('/:id', async (req, res) => {
  let author;
  try{
    author = await Author.findById(req.params.id)
    author.name = req.body.name
    await author.save()
    res.redirect(`/authors/${author.id}`)
  }catch(err){
    if(!author){
      res.redirect('/')
    } else{
    const locals= {errorMessage:'Error updating author'};
    res.render('authors/edit',{
      author:author,
      locals
    })
    }
  }
})

router.delete('/:id', async (req, res) => {
  let author;
  try{
    author = await Author.findById(req.params.id)
    
    await author.remove()
    res.redirect('/authors')
  }catch(err){
    if(author == null){
      res.redirect('/')
    } else{
    
    res.redirect(`/authors/${author.id}`)
    }
  }
})

module.exports = router