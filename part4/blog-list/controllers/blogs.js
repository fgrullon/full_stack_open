const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const usersRouter = require('./users');
const jwt = require('jsonwebtoken');



blogsRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', {username : 1, name : 1});
        res.json(blogs);
    } catch (error) {
        next(error);
    }


});

blogsRouter.post('/', async (req, res, next) => {
    console.log(req.token)
    try {
        const body = req.body;
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        
        if(!decodedToken.id){
            return res.status(401).json({ error : 'token invalid' });
        }
        const user = await User.findById( decodedToken.id );
        
        const blog = new Blog({ ...body, user : user.id });
        const blogSaved = await blog.save();

        user.blogs = user.blogs.concat(blogSaved._id);
        await user.save();

        res.status(201).json(blogSaved.toJSON());
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndRemove(req.params.id);
        res.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const blog = {...req.body};
    
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new : true})  
        res.status(200).json(updatedBlog.toJSON());

    } catch (error) {
        next(error);
    }

});

module.exports = blogsRouter;