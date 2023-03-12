const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const User = require('../models/user');

describe('when there is initially one user in db', () => {
    beforeEach( async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('sekret', 10);
        const user = new User({ username : 'root', passwordHash });

        await user.save();

    });

    test('creation succeds with a fresh username', async () => {
        const userAtStart = await helper.usersInDb();

        const newUser = {
            username : 'frankg',
            name : 'Frank Grullon',
            password : 'fullstackopen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.usersInDb();
        expect(userAtEnd).toHaveLength(userAtStart.length + 1);

        const usernames = userAtEnd.map(user => user.username);
        expect(usernames).toContain(newUser.username);

    });

    test('creation succeds with a fresh username', async () => {
        const userAtStart = await helper.usersInDb();

        const newUser = {
            username : 'frankg',
            name : 'Frank Grullon',
            password : 'fullstackopen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.usersInDb();
        expect(userAtEnd).toHaveLength(userAtStart.length + 1);

        const usernames = userAtEnd.map(user => user.username);
        expect(usernames).toContain(newUser.username);

    });

    test('creation fails when password length is less than 3 characters', async () => {
        const userAtStart = await helper.usersInDb();

        const newUser = {
            username : 'root',
            name : 'Superuser',
            password : 'Tw'
        }

        const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(401)
                .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('invalid password must be at least 3 characters long')
        
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toEqual(userAtStart)
    });


    test('creation fails when username not include', async () => {
        const userAtStart = await helper.usersInDb();

        const newUser = {
            name : 'Superuser',
            password : 'Tw'
        }

        const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(401)
                .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('User validation failed: username: Path `username` is required.')
        
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toEqual(userAtStart)
    });
});