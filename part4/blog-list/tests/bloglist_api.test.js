const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

// Clean and Initialize the database 
beforeEach( async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

describe('blogs are returned as a json', () => {

    test('all notes are returned', async () => {

        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);   

    });

    test('all notes are returned', async () => {

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength( helper.initialBlogs.length);
    
    });

    test('a specific note is whitin the returned blogs', async () => {
        const response = await api.get('/api/blogs');
        const titles = response.body.map(blog => blog.title);
    
        expect(titles).toContain('React patterns');
    });

    test('all notes have id', async () => {

        const response = await api.get('/api/blogs');
        expect(response.body[0].id).toBeDefined();
    
    });

});

describe('addition of a new blog', () => {

    test('successfully creates a new blog post', async () => {

        const post = {
            title: 'On let vs const',
            author: 'Dan Abramov',
            url: 'https://overreacted.io/',
            likes: 1
        };
    
        await api.post('/api/blogs').send(post);
    
        const response = await api.get('/api/blogs');
        const titles = response.body.map(blog => blog.title);
    
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
        expect(titles).toContain('On let vs const')
    
    
    });

    test('fails with status code 400 if data invalid', async () => {

        const post = {
            author: 'Dan Abramov',
            likes : 1
        };
    
        await api.post('/api/blogs').send(post).expect(400);
    
    });

    test('set a default like value if not include in request', async () => {

        const post = {
            title: 'On let vs const',
            author: 'Dan Abramov',
            url: 'https://overreacted.io/'
        };
    
        await api.post('/api/blogs').send(post)
    
        const response = await api.get('/api/blogs');
        const new_post = response.body.filter(blog => blog.title === 'On let vs const');
    
        expect(new_post[0].likes).toBeDefined();
    
    }, 100000);

    test('successfully update a blog post', async () => {

        const post = {
            id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 10
        };
    
        const updatedPost = await api.put(`/api/blogs/${post.id}`).send(post).expect(200);

        expect(updatedPost.body.likes).toBe(post.likes);

    });
    
});


describe('deletion of a blog', () => {
    test('succeds with status code 204 if id is valid', async () => {
        const firstBlog = await helper.blogInDb();
        const blogToBeDelete = firstBlog[0];

        await api.delete(`/api/blogs/${blogToBeDelete.id}`).expect(204);

        const blogsAtEnd = await helper.blogInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

        const titles = blogsAtEnd.map(blog => blog.title);
        expect(titles).not.toContain(blogToBeDelete.title);
    })
})