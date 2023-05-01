import { Message } from "../types";

const Notification = (message: Message ):JSX.Element  => {
    if(!message){
        return <></>
    }
    return <h2>{ message.message }</h2>
}

export default Notification;