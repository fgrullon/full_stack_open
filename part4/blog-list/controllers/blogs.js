const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {

    const blogs = await Blog.find({});
    return res.json(blogs);

});

blogsRouter.post('/', async (req, res) => {
    
    const blog = new Blog(req.body);
    await blog.save();
    return res.status(201).json(blog);

});

module.exports = blogsRouter;