const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blogs) => {
        return sum + blogs.likes
    }

    return blogs.length == 0 ? 0 : blogs.reduce(reducer, 0)
}

module.exports = {
    dummy, totalLikes
}