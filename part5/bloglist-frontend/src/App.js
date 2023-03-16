import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable';
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if(user){
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [user])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if(loggedUser){
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setConfig(user.token);
    }
  }, []);

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
  
      setBlogs([...blogs, newBlog]);
      setMessageType('success');
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setMessage(null);
        setMessageType('');
      }, 5000);
    } catch (error) {
      setMessageType('error');
      setMessage('Error occur while saving blog')
      setTimeout(() => {
        setMessage(null);
        setMessage(null)
      }, 5000)
    }

  }

  const addLike = async (blog) => {

    const updatedBlog = await blogService.update(blog.id, blog)
    const newBlogs = blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog)
    setBlogs(newBlogs);

    setMessageType('success');
    setMessage(`blog ${blog.title} liked`);
    setTimeout(() => {
      setMessage(null);
      setMessageType('');
    }, 5000);
  }

  const removeBlog = async (blog) => {
      const newBlogs = blogs.filter(b => b.id !== blog.id);
      blogService.remove(blog.id)

      setBlogs(newBlogs);

      setMessageType('success');
      setMessage(`blog ${blog.title} removed`);
      setTimeout(() => {
        setMessage(null);
        setMessageType('');
      }, 5000);
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      
      blogService.setConfig(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setMessageType('success');
      setMessage(`user ${user.name} logged in`)
      setTimeout(() => {
        setMessage(null);
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessageType('error');
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null);
        setMessage(null)
      }, 5000)
    }

  }

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification type={messageType} message={message} />

      {
      !user && <Togglable buttonLabel="login"><LoginForm 
          handleLogin={handleLogin} 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        /></Togglable>
      }
      {user && <>
        <div>
          <p>{user.name} logged in</p><button onClick={handleLogout}>log out</button>
        </div>

        <BlogForm createBlog={createBlog} />
      </>
      

      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App