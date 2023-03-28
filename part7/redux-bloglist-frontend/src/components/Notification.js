import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(!notification){
    return null
  }

  return (
    <div style={style}>
      {(notification &&
        <Alert serverity="success">
          {notification}
        </Alert>)}
    </div>
  )
}

export default Notification