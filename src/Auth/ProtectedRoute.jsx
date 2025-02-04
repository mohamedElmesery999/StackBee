import React, { useContext } from 'react'
import { authContext } from '../Contexts/AuthContext';
import Login from '../Pages/Login/Login';

export default function ProtectedRoute({ children }){

        const{isLoggedin}=  useContext(authContext)    

  return (
    <div>
     { isLoggedin  ? children : <Login />}
    </div>
  )
}