import { useState } from 'react'
import axios from 'axios'


export const useCountry = ( name ) => {
    const [country, setCountry] = useState(name)

    const getCountry = async country =>  {
        const res = await axios
        .get(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.data);
        console.log(res)
        setCountry(res.data)
    }
    

    return (
        country,
        getCountry
    )

} 