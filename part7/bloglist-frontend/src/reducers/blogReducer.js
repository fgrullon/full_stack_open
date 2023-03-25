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
    },
    deleteBlog(state, action){
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogsSlice.actions
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

export const removeBlog = id => {
  return async dispatch => {
    blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}
