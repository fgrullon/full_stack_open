import { ALL_BOOKS, ALL_BOOKS_BY_GENRE, BOOK_ADDED } from '../Querys'
import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription, useQuery } from '@apollo/client'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks : uniqByName(allBooks.concat(addedBook))
    }
  })
}

const Books = ({ notify }) => {

  const [genres, setGenres] = useState([])
  const [genre] = useState('all genres')
  const client = useApolloClient()

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

  useSubscription(BOOK_ADDED, {
    onData :  ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`New book added ${addedBook.title} by ${addedBook.author.name} `, 'success')
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      updateCache(client.cache, { query: ALL_BOOKS_BY_GENRE, variables : { genre : 'all genres'} }, addedBook)

    }
  })



  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    notify(error, 'error')
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
