import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type){
  case 'ADD':
    return {
      message : `a new blog ${action.payload.title} by ${action.payload.author} added`,
      class : 'success'
    }
  case 'DELETE':
    return {
      message : `blog ${action.payload.title} removed`,
      class : 'success'
    }
  case 'LIKE':
    return {
      message : `blog ${action.payload.title} liked`,
      class : 'success'
    }
  case 'LOGGED':
    return {
      message : `user ${action.payload.name} logged in`,
      class : 'success'
    }
  case 'LOGIN_ERROR':
    return {
      message : 'Wrong username or password',
      class : 'error'
    }
  case 'ERROR':
    return {
      message : 'Error occur while saving blog',
      class : 'error'
    }
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ( props ) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {})

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext