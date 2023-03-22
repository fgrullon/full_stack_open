import { createContext, useReducer, useContext } from 'react'

const notificationReducer = ( state, action ) => {
    switch (action.type) {
        case 'ADD':
            return `anecdote '${action.payload}' added`
        case 'VOTE':
            return `anecdote '${action.payload}' voted`
        case 'CLEAR':
            return ''
        default:
            break;
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ( props ) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider 
          value={[notification, notificationDispatch]}
        >
          { props.children }
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
