import { Alert } from '@mui/material'

const Notify = ({ errorMessage, severity }) => {


    if(!errorMessage){
      return null
    }

    return (
      <div>
        <Alert severity={severity}>
          { errorMessage }
        </Alert>
      </div>
    )
}

export default Notify
