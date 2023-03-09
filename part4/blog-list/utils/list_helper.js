const dummy = (blogs) => {

    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => {
        return sum + item.likes;
    },0 );
}

const favoriteBlog = (blogs) => {
    const {title, author, likes} = blogs.reduce(function(prev, current) {
        return (prev.likes > current.likes) ? prev : current;
    });

    return {title, author, likes};
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}