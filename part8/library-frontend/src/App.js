import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Menu from './components/Menu'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const App = () => {

  const [token, setToken] = useState('')
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const notify = ( message ) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const logout = () => {
    setToken('')
    localStorage.clear()
    client.resetStore()
    navigate('/books')
  }

  // if(!token){
  //   return (
  //     <>
  //       <Notify errorMessage={errorMessage} />
  //       <LoginForm setToken={setToken} notify={notify}  />
  //     </>
  //   )
  // }

  return (
    <div>
      <Menu logout={logout} />
      <Notify errorMessage={errorMessage} />
      <Routes>
        <Route path='/authors' element={<Authors notify={notify } />}  />
        <Route path='/books' element={<Books />}  />
        <Route path='/add' element={<NewBook notify={notify} />}  />
        <Route path='/login' element={<LoginForm notify={notify} setToken={setToken} />}  />
      </Routes>

    </div>
  )
}

export default App
