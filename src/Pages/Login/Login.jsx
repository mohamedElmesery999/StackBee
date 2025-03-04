import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button } from "@heroui/react";
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext';

export default function Login() {

  const navigate = useNavigate();

  const[errMsg , setErrMessg] = useState()
  const[isLoading , setIsLoading] = useState(false)
  const initialValues = {
   email: "TasneemElmesery18@gmail.com", password: "Mo@12345"
  };

   const {setIsLoggedin} = useContext(authContext)

  const onSubmit = () => {
    setIsLoading(true)
    setErrMessg("")
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
    .then((res) =>{
      console.log(res);
      if(res.data.message == "success"){ 
        localStorage.setItem("token" , res.data.token) 
        setIsLoggedin(true)
        navigate(location.pathname == "/login" ? "/" : location.pathname)
      }
    })
    .catch((err) =>{
      setErrMessg(err.response.data.message);
    })
    .finally(() =>{
      setIsLoading(false )
    })
    
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Minimum of 8 characters consisting of uppercase, lowercase, numbers, or special characters."),
  });

  const { handleSubmit, values, handleChange, errors, handleBlur, touched } = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  return (
   

<form className="max-w-sm px-4 mx-auto mt-16" onSubmit={handleSubmit}>
  <div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mo123.com"  />
    {touched.email && errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email}</p>)}

  </div>
  <div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
    {touched.password && errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password}</p>)}

  </div>
  <div className="flex items-start mb-5">
    <div className="flex items-center h-5">
      <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
    </div>
    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <Button isLoading={isLoading}  type="submit" className="text-white bg-green-700 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</Button>
  <p className="text-red-500 text-sm mt-1">{errMsg}</p>
</form>

  )
}
