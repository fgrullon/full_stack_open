const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const process = require('process');

const app = express();

const blogSchema = new mongoose.Schema({
    title : String,
    author : String,
    url : String,
    likes : Number
});

const Blog = mongoose.model('Blog', blogSchema);


mongoose.connect(process.env.MONGO_URI)

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (req, res) => {
    Blog.find({})
        .then(blogs => res.json(blogs) );
});

app.post('/api/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(result => res.status(200).json(result));
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});