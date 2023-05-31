import React from 'react'
import { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function NotAuthed({children}) {
    const isLoggedIn =useSelector(state=>state.LoginReducer.token)
    console.log(isLoggedIn)
    if(isLoggedIn){
      return <Navigate to='/portal'/>
    }
    return children
}

export default NotAuthed