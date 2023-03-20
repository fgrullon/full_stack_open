
import { useDispatch } from 'react-redux'
import { createAnecdote }  from '../reducers/anecdoteReducer'
import { showNotication } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(showNotication(`${anecdote} created`))
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