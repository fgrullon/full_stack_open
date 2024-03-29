const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const {   
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
} = require('./utils/middleware')
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const testingRouter = require('./controllers/testing')

mongoose.set('strictQuery', false);

logger.info('connecting to Database');

mongoose.connect(config.MONGO_URI)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch(error => {
        logger.error('error connecting to MongoDB: ', error.message);
    });

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use(requestLogger);


app.use('/api/blogs', userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if(process.env.NODE_ENV === 'test'){
    app.use('/api/testing', testingRouter)
}

app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = app;
