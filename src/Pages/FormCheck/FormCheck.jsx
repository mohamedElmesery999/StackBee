import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@heroui/react';
import { useParams } from 'react-router-dom';


export default function FormCheck() {

    const {cartId} = useParams()
    const[isLoading , setIsLoading] = useState(false)
      
   function onSubmit(){
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , {
     
       "shippingAddress": values
    
    } , {
     headers : {
       token : localStorage.getItem("token")
     }, 
     params : {
       url : "https://stack-bee.vercel.app/"
     }
    }).then(({data}) => {
     location.href = data.session.url;
    }).finally(() => {
        setIsLoading(false)
    })
   }

   const initialValues = {
        details: "",
        phone: "",
        city: ""
    }

  const validationSchema = Yup.object({
        details: Yup.string().required('Details are required'),
        phone: Yup.string().matches(/^01[0-9]{9}$/, 'Invalid phone number').required('Phone is required'),
        city: Yup.string().required('City is required')
    })


const { handleSubmit, values, handleChange, errors, handleBlur, touched } = useFormik({
    initialValues,
    onSubmit ,
    validationSchema
  });



return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Shipping Details</h2>
        <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
            <div>
                <input
                    type="text"
                    name="details"
                    placeholder="Enter details"
                    value={values.details}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {touched.details && errors.details ? <div className="text-red-500 text-sm mt-1">{errors.details}</div> : null}
            </div>

            <div>
                <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {touched.phone && errors.phone ? <div className="text-red-500 text-sm mt-1">{errors.phone}</div> : null}
            </div>

            <div>
                <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {touched.city && errors.city ? <div className="text-red-500 text-sm mt-1">{errors.city}</div> : null}
            </div>

            <Button isLoading={isLoading} type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition duration-300">Place Order</Button>
        </form>
    </div>
);
}


