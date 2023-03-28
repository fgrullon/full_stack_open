import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

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
    try {
      const newBlog = await blogService.create(blog)
      dispatch(addBlog(newBlog))
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5))
    } catch (error) {
      dispatch(setNotification('Error occur while saving blog', 5))
    }
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = await blogService.update(blog.id, { ...blog, likes : blog.likes  })
    dispatch(updateBlog(likedBlog))
    dispatch(setNotification(`blog ${likedBlog.title} liked`, 5))

  }
}

export const removeBlog = blog => {
  return async dispatch => {
    const id = blog.id
    await blogService.remove(id)
    dispatch(deleteBlog(id))

    dispatch(setNotification(`blog ${blog.title} removed`, 5))
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    const newComment = { comment : comment }
    const commentedBlog = await blogService.comment(id, newComment)
    dispatch(updateBlog(commentedBlog))
    dispatch(setNotification(`blog ${commentedBlog.title} commented`, 5))

  }
}
