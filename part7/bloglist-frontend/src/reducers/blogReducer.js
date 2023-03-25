import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name : 'blogs',
  initialState : [],
  reducers : {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action){
      state.push(action.payload)
    },
    updateBlog(state, action){
      return state.map(blog => blog.id !== action.payload.id ? blog : action.payload )
    }
  }
})

export const { setBlogs, addBlog, updateBlog } = blogsSlice.actions
export default blogsSlice.reducer

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs( blogs ))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = await blogService.update(blog.id, { ...blog, likes : blog.likes  })
    dispatch(updateBlog(likedBlog))
  }
}

