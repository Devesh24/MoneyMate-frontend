import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BASE_URL from './baseUrl'

const useCatFetch = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setLoading(true)
        try{
            const catData = await axios.get(`${BASE_URL}/api/categories`)
            setLoading(false)
            setData(catData.data)
            setError(null)
        }
        catch(err)
        {
            setError(err)
            alert(err.message)
        }
    }

    useEffect(() => {
        fetchData()
    },[])

  return { data, loading, error }
}

export default useCatFetch