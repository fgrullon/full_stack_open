const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (error) {
        next(error);
    }


});

blogsRouter.post('/', async (req, res, next) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json(blog.toJSON());
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