const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blogs) => {
        return sum + blogs.likes
    }

    return blogs.length == 0 ? 0 : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {

    const maxLikes = Math.max(...blogs.map(b => b.likes))
    const blog = blogs.filter(b => b.likes == maxLikes)[0]

    return blogs.length == 0 ? 'None' : {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}