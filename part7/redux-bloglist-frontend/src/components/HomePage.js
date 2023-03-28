import { useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
import {  useDispatch, useSelector } from 'react-redux'
import { initialBlogs, createBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import {  login } from '../reducers/userReducer'

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

  const addLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const remove = async (blog) => {
    dispatch(removeBlog(blog))
  }



  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {user && <>
        <BlogForm createBlog={create} />
      </>}

      {blogs.map(blog =>

        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={remove} currentUser={user.username} />

      )}
    </div>
  )
}

export default HomePage