const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');




blogsRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', {username : 1, name : 1});
        const sorted = blogs.sort((a,b) =>  b.likes - a.likes )

        res.json(sorted);
    } catch (error) {
        next(error);
    }


});

blogsRouter.post('/', async (req, res, next) => {
    try {

        const body = req.body;
        
        const user = req.user;
        
        const blog = new Blog({ ...body, user : user.id });
        const blogSaved = await blog.save();
        blogSaved.user = user;
        user.blogs = user.blogs.concat(blogSaved._id);
        await user.save();
        
        res.status(201).json(blogSaved.toJSON());
      
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete('/:id', async (req, res, next) => {

    try {

        const user = req.user;
        const blog = await Blog.findById(req.params.id);
    
        if(user.id.toString() === blog.user.toString()){
            await Blog.findByIdAndRemove(req.params.id);
        }else{
            return res.status(401).json({ error : 'unauthorized' });
        }
    
        res.status(204).end();
 
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.put('/:id', async (req, res, next) => {

    try {
        const id = req.params.id;
        const blog = {...req.body};

        delete blog.user

        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new : true}).populate('user', {username : 1, name : 1})

        res.status(200).json(updatedBlog.toJSON());

    } catch (error) {
        next(error);
    }

});


blogsRouter.post('/:id/comments', async (req, res, next) => {

    try {
        const blog = await Blog.findById(req.params.id);
        const { comment } = req.body

        blog.comments = blog.comments.concat(comment)
        await blog.save();
    
        res.status(200).json(blog.toJSON());

    } catch (error) {
        next(error);
    }

});

module.exports = blogsRouter;