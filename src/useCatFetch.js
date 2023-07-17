import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useCatFetch = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setLoading(true)
        try{
            const catData = await axios.get('http://localhost:5000/api/categories')
            setLoading(false)
            setData(catData.data)
            setError(null)
        }
        catch(err)
        {
            setError(err)
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData()
    },[])
    console.log(data);

  return { data, loading, error }
}

export default useCatFetch