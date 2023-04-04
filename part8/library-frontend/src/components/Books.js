import { ALL_BOOKS } from '../Querys'
import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

const Books = () => {

  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('all genres')

  const result = useQuery(ALL_BOOKS)

  const [books, setBooks] = useState([])


  useEffect(() => {

    if(result.data){
      if(!genre || genre === 'all genres'){
        setBooks(result.data.allBooks)
      }else{
        setBooks(result.data.allBooks.filter(b => b.genres.includes(genre)))
      }

      const quien = result.data.allBooks.map(b => b.genres.map(g => g)[0])
      setGenres([...new Set(quien), 'all genres'])

    }

  }, [result.data, genre]) // eslint-disable-line

  if (result.loading) {
    return <div>loading</div>
  }

  if(!books){
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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
          genres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)
        }
    </div>
  )
}

export default Books
