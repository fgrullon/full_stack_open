import { createAnecdote } from '../services/anecdotes'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../reducers/NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess : () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes : 0 })
    dispatch({
      type : 'ADD',
      payload : content
    })
    setTimeout(() => {
      dispatch({
        type : 'CLEAR'
      })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
