import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const userSlice = createSlice({
  name : 'users',
  initialState : null,
  reducers : {
    setUsers(state, action) {
      return action.payload
    }
  }
})


export const { setUsers } = userSlice.actions
export default userSlice.reducer

export const getUsers = () => {
  return async dispatch => {
    const users = await usersService.getUsers()
    dispatch(setUsers(users))
  }
}




