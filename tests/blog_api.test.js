const Blog = require('../models/blog')
const mongoose = require('mongoose')
const app = require('../app')

const supertest = require('supertest')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Promise methods in Javascript',
        author: 'Raj Neel',
        url: 'www.hashnode.com',
        likes: 100
    },
    {
        title: 'Testing React apps',
        author: 'Anu Raj',
        url: 'www.dev.to',
        likes: 200
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('correct ammount of blogposts are returned', async () => {
    const blogs = await api.get('/api/blogs')
    
    expect(blogs.body).toHaveLength(initialBlogs.length)
})

test('id of all blogs exists', async () => {
    const blogs = await Blog.find({})
    const processedBlogs = blogs.map(blog => blog._id)

    expect(processedBlogs).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})