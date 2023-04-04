import { GET_USER, ALL_BOOKS_BY_GENRE } from '../Querys'
import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

const Recomended = ({ notify }) => {

    const result = useQuery(GET_USER)
    const [favoriteGenre, setFavoriteGenre] = useState('')

    const { loading, error, data } = useQuery(ALL_BOOKS_BY_GENRE, {
      variables: { genre : favoriteGenre }
    })

    useEffect(() => {
        if(result.data){
            setFavoriteGenre(result.data.me.favoriteGenre)
        }
    }, [result.data]) // eslint-disable-line

    if(loading){
      return <div>Loading...</div>
    }
  
    if(error){
      notify(error , 'error')
    }

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
              {data.allBooks.map((a) => (
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