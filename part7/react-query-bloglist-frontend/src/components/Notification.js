import { useNotificationValue } from '../reducers/NotificationContext'
const Notification = () => {

  const nofitication = useNotificationValue()


  // const style = {
  //   border: 'solid',
  //   padding: 10,
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  return (
    <div className={ nofitication.class }>
      { nofitication.message }
    </div>
  )
}

export default Notification