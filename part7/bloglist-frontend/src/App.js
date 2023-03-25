import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { showNotification } from './reducers/notificationReducer'
import {  useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const loginFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    if(user){
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [user])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setConfig(user.token)
    }
  }, [])

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)

      setBlogs([...blogs, newBlog])
      dispatch(showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5))
    } catch (error) {
      dispatch(showNotification('Error occur while saving blog', 5))
    }

  }

  const addLike = async (blog) => {

    const updatedBlog = await blogService.update(blog.id, blog)
    const newBlogs = blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog)
    setBlogs(newBlogs)

    dispatch(showNotification(`blog ${blog.title} liked`, 5))

  }

  const removeBlog = async (blog) => {
    const newBlogs = blogs.filter(b => b.id !== blog.id)
    blogService.remove(blog.id)

    setBlogs(newBlogs)

    dispatch(showNotification(`blog ${blog.title} removed`, 5))

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
      dispatch(showNotification(`user ${user.name} logged in`, 5))

    } catch (error) {
      dispatch(showNotification('Wrong username or password', 5))

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

        <BlogForm createBlog={createBlog} />
      </>


      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} currentUser={user.username} />
      )}
    </div>
  )
}

export default App