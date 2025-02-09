import React, { useContext } from 'react'
import { authContext } from '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedAuthRoute({children}) {


  const {isLoggedin} = useContext(authContext)

  return (
    <div>
          {!isLoggedin ? children : <Navigate to={"/"}/>}
    </div>
  )
}
