const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (req, res, next) => {
    logger.info('Method: ', request.method);
    logger.info('Path: ', request.path);
    logger.info('Body: ', request.body);
    logger.info('---');
    next();
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error : 'unknown endpoint' });
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message);

    if(error.name === 'CastError' && error.message.includes('ObjectId')){
        return res.status(400).send({ error : 'malformatted id' })
    }else if(error.name === 'ValidationError'){
        return res.status(400).json({ error : error.message });
    }else if(error.name === 'JsonWebTokenError'){
        return res.status(400).json({ error : error.message });
    }else if(error.name === 'TokenExpiredError'){
        return res.status(401).json({ error : 'token expired'});
    }

    next(error);
}

const tokenExtractor = (req, res, next) => {

    const authorization = req.get('authorization');

    if(authorization && authorization.startsWith('Bearer ')){
        req.token = authorization.replace('Bearer ', '');
    }

    next();
}

const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
        
    if(decodedToken.id){
        req.user = await User.findById( decodedToken.id );
    }
    next();    
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}