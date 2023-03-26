import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import {  useDispatch, useSelector } from 'react-redux'
import { initialBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { signin, login } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginFormRef = useRef()
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

  const handleLogin = async (event) => {
    event.preventDefault()
    loginFormRef.current.toggleVisibility()

    dispatch(signin({ username, password }))

  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload(true)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {!user && <Togglable buttonLabel="login" ref={loginFormRef}>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        /></Togglable>
      }
      {user && <>
        <div>
          <p>{user.name} logged in</p><button onClick={handleLogout} id="logout" >log out</button>
        </div>

        <BlogForm createBlog={create} />
      </>


      }
      {blogs.map(blog =>

        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={remove} currentUser={user.username} />

      )}
    </div>
  )
}

export default App