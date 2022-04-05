const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const {info, error} = require('./utils/logger')
const {MONGODB_URI, PORT} = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = MONGODB_URI
info('connecting to ', mongoUrl);
mongoose.connect(mongoUrl)
        .then(result => {
            info('connected to database');
        })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app