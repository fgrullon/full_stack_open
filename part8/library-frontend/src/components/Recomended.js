import { GET_USER, ALL_BOOKS } from '../Querys'
import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

const Recomended = () => {

    const result = useQuery(GET_USER)
    const [favoriteGenre, setFavoriteGenre] = useState('')
    const { data } = useQuery(ALL_BOOKS)
    const [books, setBooks] = useState([])

    useEffect(() => {
        if(result.data){
            setFavoriteGenre(result.data.me.favoriteGenre)
        }
    }, [result.data])

    useEffect(() => {
        if(data && favoriteGenre){
            setBooks(data.allBooks.filter(b => b.genres.includes(favoriteGenre)))
        }
    }, [data])



    return (
        <div>
          <h2>Recomendations</h2>
          <p>books in your favorite genre <strong>{ favoriteGenre }</strong></p>
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
        </div>
    )
}

export default Recomended