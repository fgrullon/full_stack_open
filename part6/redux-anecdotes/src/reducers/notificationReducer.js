import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name : 'notification',
    initialState,
    reducers : {
        showNotication( state, action){
            return action.payload
        }
    }
})

export const { showNotication } = notificationSlice.actions
export default notificationSlice.reducer