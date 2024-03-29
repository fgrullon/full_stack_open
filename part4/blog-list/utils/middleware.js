const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method);
    logger.info('Path: ', req.path);
    logger.info('Body: ', req.body);
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
    
    try {
        if(req.headers.authorizarion){
            const authorization = req.headers.authorizarion;
            if(authorization && authorization.startsWith('Bearer ')){
                req.token = authorization.replace('Bearer ', '');
            }
        }
    } catch (error) {
        next(error);
    }

    next();
}

const userExtractor = async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        
        if(decodedToken.id){
            req.user = await User.findById( decodedToken.id );
        }
    } catch (error) {
        next(error);
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