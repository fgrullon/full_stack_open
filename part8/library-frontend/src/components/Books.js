import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from '../Querys'
import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import Notify from './Notify'

const Books = () => {

  const [genres, setGenres] = useState([])
  const [genre] = useState('all genres')

  const result = useQuery(ALL_BOOKS)

  const { loading, error, data, refetch } = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre }
  })


  useEffect(() => {
    if(result.data){
      const quien = result.data.allBooks.map(b => b.genres.map(g => g)[0])
      setGenres([...new Set(quien), 'all genres'])
    }

  }, [result.data]) // eslint-disable-line


  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    <Notify errorMessage={error} />
  }

  if(!data){
    return null
  }


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
          genres.map(g => <button key={g} onClick={() => refetch({ genre: g })}>{g}</button>)
        }
    </div>
  )
}

export default Books
