import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'


const User = () => {

  const users = useSelector(state => state.users)
  const match = useMatch('/users/:id')
  const user = users ? users.find(u => u.id === match.params.id) : null

  return(
    user &&
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(b =>
          <li key={b.id}>{b.title}</li>
        )}
      </ul>
    </div>
  )

}

export default User