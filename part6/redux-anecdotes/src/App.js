
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterComponent from './components/FilterComponent'

const App = () => {


  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterComponent />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App