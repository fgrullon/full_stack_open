const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res, next) => {

    try {
        const users = await User.find({}).populate('blogs', {title : 1, likes : 1});
        res.status(200).json(users);
    } catch (exception) {
        next(exception);
    }

});

usersRouter.post('/', async (req, res, next) => {
    try {
        const { username, name, password } = req.body;

        if(password.length < 3){
            return res.status(401).json({ error : 'invalid password must be at least 3 characters long'});
        }
        console.log(!password)
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
    
        const user = new User({
            username,
            name,
            passwordHash
        });
    
        const savedUser = await user.save();
    
        res.status(201).json(savedUser);
    } catch (exception) {
        next(exception);
    }


});

module.exports = usersRouter;