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
});