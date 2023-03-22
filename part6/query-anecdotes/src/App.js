import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import { getAnecdotes } from './services/anecdotes'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const { status, data, error } = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry : 2
    }
  )

  if(status === 'loading'){
    return(<spam>Loading... </spam>)
  }

  if(status === 'error'){
    return(<spam>Error: { error.message }</spam>)
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
