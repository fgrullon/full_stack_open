import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Menu from './components/Menu'
const Notify = ({ errorMessage }) => {

  if(!errorMessage){
    return null
  }

  return (
    <div style={{ color : 'red' }}>
      { errorMessage }
    </div>
  )
}

const App = () => {

  const [errorMessage, setErrorMessage] = useState('')

  const notify = ( message ) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }
  console.log(notify)
  return (
    <div>
      <Menu />
      <Notify errorMessage={errorMessage} />
      <Routes>
        <Route path='/authors' element={<Authors notify={notify } />}  />
        <Route path='/books' element={<Books />}  />
        <Route path='/add' element={<NewBook notify={notify} />}  />
      </Routes>

    </div>
  )
}

export default App
