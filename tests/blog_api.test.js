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

test('new blog post created', async () => {
    const newBlog =  {
        title: 'New Blog',
        author: 'Random Person',
        url: 'www.geeksforgeeks.com',
        likes: 150
    }

    await api.post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await Blog.find({})
    const blogsAtEndJSON = blogsAtEnd.map(blog => blog.toJSON())

    expect(blogsAtEndJSON).toHaveLength(initialBlogs.length + 1)
})

test('if the request is missing the likes property, it will default to 0', async () => {
    const newBlog =  {
        title: 'New Blog 2',
        author: 'Random Human',
        url: 'www.leetcode.com'
    }

    await api.post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await Blog.find({})
    const blogsAtEndJSON = blogsAtEnd.map(blog => blog.toJSON())
    const addedBlog = blogsAtEndJSON.find(blog => blog.title === 'New Blog 2')

    expect(addedBlog.likes).toBe(0)
})

afterAll(() => {
    mongoose.connection.close()
})