import { createContext, useContext, useReducer } from 'react'
import blogService from '../services/blogs'

const initialState = []
const blogsReducer = (state, action) => {
  switch (action.type) {
  case 'FETCH':
    state =  blogService.getAll().then(res => res)
    return state
  default:
    return 2
  }
}

const BlogsContext = createContext(initialState)

export const BlogsContextProvider = ( props ) => {
  const [blogs, blogsDispatch] = useReducer(blogsReducer, [])

  return (
    <BlogsContext.Provider value={[blogs, blogsDispatch]}>
      { props.children }
    </BlogsContext.Provider>
  )
}

export const useBlogValue = () => {
  const blogsAndDispatch = useContext(BlogsContext)
  return blogsAndDispatch[0]
}

export const useBlogDispatch = () => {
  const blogsAndDispatch = useContext(BlogsContext)
  return blogsAndDispatch[1]
}
export default BlogsContext