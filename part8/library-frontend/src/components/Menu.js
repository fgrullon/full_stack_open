import { Button, AppBar, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'

const Menu = () =>  {

    return (
        <div>
            <AppBar  position="static">
                <Toolbar>
                    <Button  color="inherit" component={Link} to="/authors">Authors</Button>
                    <Button  color="inherit" component={Link} to="/books">Books</Button>
                    <Button  color="inherit" component={Link} to="/add">New Book</Button>
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default Menu