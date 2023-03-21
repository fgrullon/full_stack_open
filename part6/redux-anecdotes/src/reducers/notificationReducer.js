import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name : 'notification',
    initialState,
    reducers : {
        showNotification( state, action){
            return action.payload
        },
        hideNotification (state, action){
            return ''
        }
    }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = ( message, time ) => {
    return async dispatch => {
        dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(hideNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer