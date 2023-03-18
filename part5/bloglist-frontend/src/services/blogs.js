import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let config = null

const setConfig = newToken => {
  config = {
    headers : { Authorizarion : `Bearer ${newToken}` }
  }
}

const getAll = async () => {
  const request = await axios.get(baseUrl, config)
  return request.data
}

const create = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, Blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, Blog, config)
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config)
}


export default { getAll, create, setConfig, update, remove }