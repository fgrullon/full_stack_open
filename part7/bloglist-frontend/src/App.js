import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import {  useDispatch, useSelector } from 'react-redux'
import { initialBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const loginFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    if(user){
      dispatch(initialBlogs())
    }

  }, [user])

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setConfig(user.token)
    }
  }, [])

  const create = async (blog) => {
    try {
      dispatch(createBlog(blog))
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 5))
    } catch (error) {
      dispatch(setNotification('Error occur while saving blog', 5))
    }

  }

  const addLike = async (blog) => {

    dispatch(likeBlog(blog))

    dispatch(setNotification(`blog ${blog.title} liked`, 5))

  }

  const remove = async (blog) => {

    dispatch(removeBlog(blog.id))

    dispatch(setNotification(`blog ${blog.title} removed`, 5))

  }

  const handleLogin = async (event) => {
    event.preventDefault()
    loginFormRef.current.toggleVisibility()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )


      blogService.setConfig(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification(`user ${user.name} logged in`, 5))

    } catch (error) {
      dispatch(setNotification('Wrong username or password', 5))

    }

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