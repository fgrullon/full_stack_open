import { useState, useEffect } from 'react'
import axios from 'axios'


  
export const useResource = ( baseUrl ) => {

    const [resources, setResources] = useState([])

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
    }

    const create = async newObject => {
        const response = await axios.post(baseUrl, newObject)
        setResources([...resources, response.data])
    }

    useEffect(() => {
        getAll()
    }, [])

    const service = {
        getAll,
        create
      }
    
      return [
        resources, service
      ]

}