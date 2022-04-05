require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const {info, error} = require('./utils/logger')
const {MONGODB_URI, PORT} = require('./utils/config')
const Blog = require('./models/blog')

const mongoUrl = MONGODB_URI
info('connecting to ', mongoUrl);
mongoose.connect(mongoUrl)
        .then(result => {
            info('connected to database');
        })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})