import { useEffect } from 'react'
import BlogForm from './BlogForm'
import Notification from './Notification'
import {  useDispatch, useSelector } from 'react-redux'
import { initialBlogs, createBlog } from '../reducers/blogReducer'
import {  login } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    if(user){
      dispatch(initialBlogs())
    }

  }, [user])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      dispatch(login(user))
    }
  }, [])

  const create = async (blog) => {
    dispatch(createBlog(blog))
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {user && <>
        <BlogForm createBlog={create} />
      </>}

      {blogs.map(blog =>
        <div key={blog.id} className="blogs">
          <Link  className="blog" to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default HomePage