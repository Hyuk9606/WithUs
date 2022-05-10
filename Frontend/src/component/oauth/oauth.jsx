import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

export default function Oauth() {
    const [token, setToken] = useState('');
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const baseUrl = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_BACK_PORT
    useEffect(() => {
        const url = new URL(window.location.href)
        setToken(url.searchParams.get('token'))
        axios.get(baseUrl + '/api/v1/users', {
            headers : {
                Authorization : `Bearer ${url.searchParams.get('token')}`
            }
        }).then((response) => 
        dispatch({type:"LOGIN", data:response, token:`${url.searchParams.get('token')}`})
        ).then(()=>
        window.opener.parent.location.reload()
        ).then(()=> 
        window.close()
        ).catch((e) => 
            console.log(e)
        )
        
    },[])

  return (
    <>
    </>
  )
}
