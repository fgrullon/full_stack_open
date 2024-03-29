import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery , useMutation,  useQueryClient} from 'react-query'
import { getAnecdotes, voteAnecdote } from './services/anecdotes'
import { useNotificationDispatch } from './reducers/NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateMutation = useMutation(voteAnecdote, {
    onSuccess: ({ content }) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({
        type : 'VOTE',
        payload : content
      })
      setTimeout(() => {
        dispatch({
          type : 'CLEAR'
        })
      }, 5000)
    },
    onError : (err) => {
      dispatch({
        type : 'ERROR',
        payload : 'A error ocurred'
      })
      setTimeout(() => {
        dispatch({
          type : 'CLEAR'
        })
      }, 5000)
    }
  })

  const handleVote = (anecdote) => {
    updateMutation.mutate({...anecdote, votes : anecdote.votes + 1})

  }

  const { status, data, error } = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry : 2
    }
  )

  if(status === 'loading'){
    return(<span>Loading... </span>)
  }

  if(status === 'error'){
    return(<span>Error: { error.message }</span>)
  }

  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
