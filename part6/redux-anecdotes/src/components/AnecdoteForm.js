
import { useDispatch } from 'react-redux'
import { createAnecdote }  from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdotesService.create(anecdote)
        dispatch(createAnecdote(newAnecdote))
        dispatch(showNotification(`${anecdote} created`))
        setTimeout(() => {
            dispatch(hideNotification())
          }, 5000)
      }
    
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
            <div><input name="anecdote"/></div>
            <button type="submit" >create</button>
            </form>
        </>
    )
}

export default AnecdoteForm