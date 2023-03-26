import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name : 'user',
  initialState : null,
  reducers : {
    login(state, action){
      blogService.setConfig(action.payload.token)
      return action.payload
    },
    logout(){
      window.localStorage.clear()
      window.location.reload(true)
    }
  }
})


export const { login, logout } = userSlice.actions
export default userSlice.reducer

export const signin = user => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login(user)
      dispatch(login(loggedUser))
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loggedUser)
      )
      dispatch(setNotification(`user ${loggedUser.name} logged in`, 5))
    } catch (error) {
      dispatch(setNotification('Wrong username or password', 5))
    }

  }
}




