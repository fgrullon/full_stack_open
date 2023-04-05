import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Menu from './components/Menu'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recomended from './components/Recomended'
import { useApolloClient} from '@apollo/client'

const App = () => {

  const [token, setToken] = useState('')
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState('')
  const [severity, setSeverity] = useState('')

  const navigate = useNavigate()

  const notify = ( message, severity ) => {
    setSeverity(severity)
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
      setSeverity('')
    }, 5000)
  }

  const logout = () => {
    setToken('')
    localStorage.clear()
    client.resetStore()
    navigate('/books')
  }


  return (
    <div>
      <Menu logout={logout} />
      <Notify errorMessage={errorMessage} severity={severity} />
      <Routes>
        <Route path='/authors' element={<Authors notify={notify} />}  />
        <Route path='/books' element={<Books notify={notify} />}  />
        <Route path='/add' element={<NewBook notify={notify} />}  />
        <Route path='/login' element={<LoginForm notify={notify} setToken={setToken} />}  />
        <Route path='/recomended' element={<Recomended notify={notify} />}  />

      </Routes>

    </div>
  )
}

export default App
