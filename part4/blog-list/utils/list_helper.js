const dummy = (blogs) => {

    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => {
        return sum + item.likes;
    },0 );
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return {};
    const {title, author, likes} = blogs.reduce(function(prev, current) {
        return (prev.likes > current.likes) ? prev : current;
    });

    return {title, author, likes};
}

const mostBlogs = (blogs) => {
    
    if(blogs.length === 0) return {};
    const map = {};

    blogs.forEach(element => {
        map[element.author] = map[element.author] ? map[element.author] + 1 : 1;
    });

    const author = Object.entries(map).sort((a,b) => b[1] - a[1])[0];

    return { author : author[0], blogs : author[1]};

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}