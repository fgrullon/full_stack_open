import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'

const getUsers = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}



export default { getUsers }