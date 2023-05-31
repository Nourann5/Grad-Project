import React from 'react'
import { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Authed({children}) {
    const isLoggedIn =useSelector(state=>state.LoginReducer.token)
    console.log(isLoggedIn)
    if(!isLoggedIn){
      return <Navigate to='/login'/>
    }
    return children
}

export default Authed