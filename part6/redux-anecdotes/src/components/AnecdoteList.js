import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      if(state.filter.length) {
        return state.anecdotes.filter(a => a.content.includes(state.filter) )
      }
      return state.anecdotes
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(showNotification(`you voted '${anecdote.content}' `))
        setTimeout(() => {
          dispatch(hideNotification())
        }, 5000)
    }

   return (
    anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
    )
   )
}

export default AnecdoteList