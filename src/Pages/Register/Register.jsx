import React, { useState } from 'react';
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const navigate = useNavigate();

  const[isLoading , setIsLoading] = useState(false)
  const[errMsg , setErrMsg] = useState("")

  const initialValues = {
    name: "", email: "", password: "", rePassword: "", phone: ""
  };

  const onSubmit =  () => {
    setErrMsg("")
    setIsLoading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
    .then((res)=>{
      console.log(res)
      navigate("/Login")
    })
    .catch((err)=>{
      console.log(err.response.data.message);
      setErrMsg(err.response.data.message)
    })
    .finally(()=>{
      setIsLoading(false )
    })
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name length must be more than 2 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Minimum of 8 characters consisting of uppercase, lowercase, numbers, or special characters."),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string()
      .matches(/^\d{11}$/, "phone number must be 11 digits")
      .required("phone number is required"),
  });

  const { handleSubmit, values, handleChange, errors, handleBlur, touched } = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  return (
    <div className="my-16">
    


<form className="max-w-3xl px-4  mx-auto" onSubmit={handleSubmit}>
<div className="relative z-0 w-full mb-5 group">
        <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
        <label for="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
        {touched.name && errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name}</p>)}

    </div>
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
      <label for="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email </label>
      {touched.email && errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email}</p>)}

  </div>
 
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
      <input  onBlur={handleBlur} onChange={handleChange} value={values.password}  type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
      <label for="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      {touched.password && errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password}</p>)}

  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input  onBlur={handleBlur} onChange={handleChange} value={values.rePassword}  type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
      <label for="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
      {touched.rePassword && errors.rePassword && (<p className="text-red-500 text-sm mt-1">{errors.rePassword}</p>)}

  </div>
  </div>


    <div className="relative z-0 w-full mb-5 group">
        <input  onBlur={handleBlur} onChange={handleChange} value={values.phone}  type="tel"  name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
        <label for="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
        {touched.phone && errors.phone && (<p className="text-red-500 text-sm mt-1">{errors.phone}</p>)}

    </div>
  
 
    <Button isLoading={isLoading}  type="submit"  className="w-2/5 mx-auto text-white  bg-green-700 hover:bg-green-500 ">Register</Button>
    {errMsg && <p className="text-red-500 text-sm ">{errMsg}</p>}

    </form>

    </div>
  );
}
