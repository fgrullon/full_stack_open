const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const passwordHash = user === null
        ? false
        :  await bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordHash)){
        return res.status(491).json({
            error : 'invalid username or password'
        });
    }

    const userForToken = {
        username : user.username,
        id : user._id
    }

    //token expires in one hour
    const token = jwt.sign(
        userForToken, 
        process.env.SECRET,
        { expiresIn : 60*60 }
    );

    res.status(200).send({ token, username : user.username, name : user.name });
});

module.exports = loginRouter;