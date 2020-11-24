const blogsRouter = require('express').Router()
const Bloglist = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Bloglist.find({}).then(blogs => {
    response.json(blogs.map(bloglist => bloglist.toJSON()))
  })
})


blogsRouter.get('/:id', (request, response, next) => {
  Bloglist.findById(request.params.id)
    .then(bloglist => {
      if (bloglist) {
        response.json(bloglist.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const bloglist = new Bloglist({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  bloglist.save()
    .then(savedBloglist => {
      response.json(savedBloglist.toJSON())
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Bloglist.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const bloglist = {
    content: body.content,
    important: body.important,
  }

  bloglist.findByIdAndUpdate(request.params.id, bloglist, { new: true })
    .then(updatedBloglist => {
      response.json(updatedBloglist.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter