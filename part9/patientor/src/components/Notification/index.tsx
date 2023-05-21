
interface Props {
    error?: string;
}

const Notification = ({error}: Props ):JSX.Element  => {
    if(!error){
        return <></>
    }
    return <h2 style={{ color: "red" }}>{ error }</h2>
}

export default Notification;