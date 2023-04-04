import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from '../Querys'
import { useState } from 'react'
import Select  from 'react-select'

const Authors = ({ notify }) => {
  const [birthYear, setBirthYear] = useState('')
  const [selectedOption, setSelectedOption] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [updateBirnYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [ { query : ALL_AUTHORS } ],
    onError: (error) => {
      const message = error.graphQLErrors[0].message
      notify(message, 'error')
    }
  })

  if (result.loading) {
    return <div>loading</div>
  }

  const authors = result.data.allAuthors

  if(!authors){
    return null
  }

  const dd_authors = authors.map(a => a = {...a, value : a.name, label : a.name})

  const submit = (e) => {
    e.preventDefault();

      updateBirnYear({ variables : { 
        name : selectedOption.name, 
        setBornTo : Number(birthYear) 
      }})
  

  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          author
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={dd_authors}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
