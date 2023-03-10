const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

// Clean and Initialize the database 
beforeEach( async () => {
    await Blog.deleteMany({});
    
    for(let blog of helper.initialBlogs){
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
});


test('all notes are returned', async () => {

    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength( helper.initialBlogs.length);

});

test('all notes have id', async () => {

    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();

});

test('successfully creates a new blog post', async () => {

    const post = {
        title: 'On let vs const',
        author: 'Dan Abramov',
        url: 'https://overreacted.io/',
        likes: 1
    };

    await api.post('/api/blogs').send(post)
     

    const response = await api.get('/api/blogs');
    const titles = response.body.map(blog => blog.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain('On let vs const')


});