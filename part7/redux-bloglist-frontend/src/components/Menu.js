
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Button } from '@mui/material'

const Menu = () => {

  const user = useSelector(state => state.user)

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload(true)
  }


  return(
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
                blogs
        </Button>
        <Button color="inherit" component={Link} to='users'>
                users
        </Button>
        {user &&
            <>
              <em>{user.name} logged in </em>
              <button onClick={handleLogout} id="logout"> log out</button>
            </>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Menu