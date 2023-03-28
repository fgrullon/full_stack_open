import { useMatch, Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react'
import { commentBlog } from '../reducers/blogReducer'
const Blog = ({ addLike, removeBlog, currentUser }) => {

  const blogs = useSelector(state => state.blogs)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const match = useMatch('/blogs/:id')
  const blog = blogs ? blogs.find(b => b.id === match.params.id) : null


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

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    console.log('called')
  }
  if(!blog){
    return null
  }

  return (
    <div>
      <div >
        <div className="titleAndAuthor">
          <h2>{blog.title} {blog.author}</h2>


        </div>
        <div>
          <div>
            <Link to={blog.url}>{blog.url}</Link>
          </div>
          <div>
            {blog.likes} likes
            <button
              onClick={handleLike}
              className="like"
            >like</button>
          </div>
          <div>
          added by {blog.user.name}
          </div>
        </div>
        <div>
          {currentUser === blog.user.username
            ? <button onClick={handleRemove} id="remove">remove</button>
            : ''
          }
        </div>
      </div>
      <div>
        <h2>comments</h2>
        <div>
          <form onSubmit={handleComment}>
            <input
              type="text"
              value={comment}
              name="comment"
              onChange={({ target }) => setComment(target.value)}
            />
            <button type="submit">add comment</button>
          </form>

        </div>
        <ul>
          {blog.comments.map((c, idx) => <li key={idx}>{c}</li>)}
        </ul>
      </div>
    </div>
  )

}

export default Blog