const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find({});
        return res.json(blogs);
    } catch (error) {
        next(error);
    }


});

blogsRouter.post('/', async (req, res, next) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        return res.status(201).json(blog);
    } catch (exception) {
        next(exception);
    }


});

module.exports = blogsRouter;