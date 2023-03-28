import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import {  useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer'
import { login } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'

import HomePage from './components/HomePage'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { signin } from './reducers/userReducer'
import Menu from './components/Menu'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginFormRef = useRef()
  const dispatch = useDispatch()

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

  const handleLogin = async (event) => {
    event.preventDefault()
    loginFormRef.current.toggleVisibility()

    dispatch(signin({ username, password }))

  }


  return (
    <div>
      <Menu />
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

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App