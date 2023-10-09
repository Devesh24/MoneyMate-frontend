import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BASE_URL from './baseUrl'

const useFetchUser = () => {
    const [userData, setUserData] = useState([])
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
  
    const fetchData = async () => {
      setLoading(true)
      try{
          const data = await axios.post(`${BASE_URL}/api/user`, {
            token: window.localStorage.getItem("token")
          })
          setUserData(data.data)
          setLoading(false)
          setError(null)
      }
      catch(err)
      {
          setError(err)
          window.location.href = "./login"
          alert(err.message)
      }
    }
  
    useEffect(()=>{
      userData[0] && setName(userData[0].name) 
      userData[0] && setId(userData[0]._id)
    },[userData])
    
    useEffect(() => {
      fetchData()
    }, [])
  
    return {name, id, loading, error}
}

export default useFetchUser