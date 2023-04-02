import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../Querys'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ notify, setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            notify(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('LoggedInUser', token)
        }
    }, [result.data]) // eslint-disable-line

    const submit = (event) => {
        event.preventDefault();
        login( { variables : { username , password } } )
        navigate('/books')

    }

    return(
        <div>
            <h2>login</h2>
            <form onSubmit={submit}>
                <div>
                    <TextField label="username" onChange={({ target }) => setUsername(target.value)}/>
                </div>
                <div>
                    <TextField label="password" type="password" onChange={({ target }) => setPassword(target.value)}/>
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit">
                        login
                    </Button>
                </div>
            </form>
        </div>
    )

}

export default LoginForm