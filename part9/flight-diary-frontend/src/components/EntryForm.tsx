import { NewEntry } from "../types";
import { useState } from 'react';
const EntryForm = ():JSX.Element => {
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState('');
    const [visibility, setVisibility] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        return 1
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>

            </form>
        </div>
    )

 
}

export default EntryForm;