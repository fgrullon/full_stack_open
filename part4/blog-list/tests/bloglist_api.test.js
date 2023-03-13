const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');
const User = require('../models/user');
const bcrypt = require('bcrypt');
// Clean and Initialize the database 
beforeEach( async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save);
    
    await Promise.all(promiseArray);
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
    let token = null;

    beforeAll( async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('password', 10);
        const user = new User({ username : 'frank', passwordHash });
        
        await user.save();

        //login
        await api.post('/api/login').send({ username : 'jane', password : 'password' })
                .then( res => {
                    return (token = res.body.token)
                });

        return token;
    });

    test('successfully creates a new blog post by auhtorized user', async () => {

        const blog = {
            title: 'useGet/Post React Custom hook',
            author: 'Sebastian Ahlman',
            url: 'https://medium.com'
        };
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

        const titles = response.body.map(blog => blog.title);
        expect(titles).toContain('useGet/Post React Custom hook')
    
    
    });

    test('fails with status code 400 if data invalid', async () => {

        const post = {
            author: 'Dan Abramov',
            likes : 1
        };
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(post)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
    });

    test('set a default like value if not include in request', async () => {

        const post = {
            title: 'On let vs const',
            author: 'Dan Abramov',
            url: 'https://overreacted.io/'
        };
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(post)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

        const new_post = blogsAtEnd.filter(blog => blog.title === 'On let vs const');
    
        expect(new_post[0].likes).toBeDefined();
    
    });

    test('successfully update a blog post', async () => {

        const blog = {
            id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 10
        };
    
        const updatedPost = await api.put(`/api/blogs/${post.id}`).send(blog).expect(200);

        expect(updatedPost.body.likes).toBe(blog.likes);

    });

    test('unauthorized user cannot create a blog', async () => {
        const blog = {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 10
        };

        token = null

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = helper.blogInDb();

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
    
});


describe('deletion of a blog', () => {
    let token = null;

    beforeAll( async () => {
        await Blog.deleteMany({});
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('password', 10);
        const user = new User({ username : 'jane', passwordHash });

        await user.save();

        //Login
        await api
            .post('/api/login')
            .send({ username: 'jane', password: 'password' })
            .then((res) => {
                return (token = res.body.token)
            })
        
        const blog = {
            id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 10
        };

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(post)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        return token
    })

    test('succeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogInDb();
        const blogToBeDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToBeDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        const blogsAtEnd = await helper.blogInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

        const titles = blogsAtEnd.map(blog => blog.title);
        expect(titles).not.toContain(blogToBeDelete.title);
    })
})

afterAll(() => {
    mongoose.connection.close()
});