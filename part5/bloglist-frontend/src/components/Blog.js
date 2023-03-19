import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {

  const [showDetail, setShowDetails] = useState(false)

  const hide = { display: showDetail ? 'none' : '' }
  const show = { display: showDetail ? '' : 'none' }

  const handleLike = (event) => {
    event.preventDefault()
    const likes = blog.likes + 1
    const updatedBlog = { ...blog, likes : likes }
    addLike(updatedBlog)
  }

  const handleRemove = (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removeBlog(blog)
    }
  }

  return (
    <div className="blog">
      <div className="titleAndAuthor">
        {blog.title} {blog.author}

        <button
          style={hide}
          onClick={() => setShowDetails(!showDetail)}
          className="showDetail"
        >view</button>

        <button
          style={show}
          onClick={() => setShowDetails(!showDetail)}
          className="hideDetail"
        >hide</button>

      </div>
      <div style={show} className="otherDetails">
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button
            onClick={handleLike}
            className="like"
          >like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </div>
      <div>
        <button onClick={handleRemove} id="remove">remove</button>
      </div>
    </div>
  )

}

export default Blog