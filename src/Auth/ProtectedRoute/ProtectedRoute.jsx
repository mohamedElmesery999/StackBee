import React from 'react'
import Login from '../../Pages/Login/Login';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }){

    console.log(children);
    

  return (
    <div>
      {localStorage.getItem("token") != null ? children : <Navigate to={"/login"}/>}
    </div>
  )
}
