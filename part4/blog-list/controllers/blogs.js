const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs);
    });
});

blogsRouter.post('/api/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(result => res.status(200).json(result));
});

module.exports = blogsRouter;