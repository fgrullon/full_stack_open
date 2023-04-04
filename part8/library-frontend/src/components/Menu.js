import { Button, AppBar, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'

const Menu = ({ logout }) =>  {

    const user = localStorage.getItem('LoggedInUser')

    return (
        <div>
            <AppBar  position="static">
                <Toolbar>
                    <Button  color="inherit" component={Link} to="/authors">Authors</Button>
                    <Button  color="inherit" component={Link} to="/books">Books</Button>
                    {user &&
                        <>
                            <Button  color="inherit" component={Link} to="/add">New Book</Button>
                            <Button  color="inherit" component={Link} to="/recomended">Recomended</Button>
                            <Button onClick={logout} id="logout" color="inherit" > log out</Button>
                        </>
                    }
                    {!user && <Button  color="inherit" component={Link} to="/login">Log in</Button>}

                </Toolbar>
            </AppBar>
        </div>

    )
}

export default Menu