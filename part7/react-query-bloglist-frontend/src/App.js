import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useNotificationDispatch } from './reducers/NotificationContext'
import {  useBlogValue, useBlogDispatch } from './reducers/BlogsContext'
const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const notification = useNotificationDispatch()
  const loginFormRef = useRef()
  const BlogDispatch = useBlogDispatch()



  // const blogs = getBlogs()
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setConfig(user.token)
    }

    BlogDispatch({ type : 'FETCH' })
  }, [])
  const blogs =  useBlogValue()
  console.log(blogs)

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)

      // setBlogs([...blogs, newBlog])
      notification({
        type : 'ADD',
        payload : newBlog
      })

    } catch (error) {
      notification({ type : 'ERROR' })
    }

  }

  const addLike = async (blog) => {

    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      const newBlogs = blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog)
      // setBlogs(newBlogs)
      notification({ type : 'LIKE', payload : newBlogs })

    } catch (error) {
      notification({ type : 'ERROR' })
    }


  }

  const removeBlog = async (blog) => {
    try {
      blogs.filter(b => b.id !== blog.id)
      blogService.remove(blog.id)

      // setBlogs(newBlogs)
      notification({ type : 'DELETE', payload : blog })

    } catch (error) {
      notification({ type : 'ERROR' })
    }

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

      notification({ type : 'LOGGED', payload : user })
    } catch (error) {
      notification({ type : 'LOGIN_ERROR' })

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
      {blogs.length > 0 && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} currentUser={user.username} />
      )}
    </div>
  )
}

export default App