import React from 'react';
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function Register() {

  const initialValues = {
    name: "", email: "", password: "", ConfirmPassword: "", Phone: ""
  };

  const onsubmit = async () => {
    console.log(values);
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
    console.log(data);
    
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
      .matches(/^\d{11}$/, "Phone number must be 11 digits")
      .required("Phone number is required"),
  });

  const { handleSubmit, values, handleChange, errors, handleBlur, touched } = useFormik({
    initialValues,
    onsubmit,
    validationSchema
  });

  return (
    <div className="my-32">
      <form onSubmit={handleSubmit}>
        <div className="w-2/5 mx-auto grid grid-cols-1 gap-6">
          <div>
            <Input onBlur={handleBlur} onChange={handleChange} value={values.name} variant="bordered" style={{ border: 'none', boxShadow: 'none' }}  name="name" label="Name"type="text"/>
            {touched.name && errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name}</p>)}
          </div>

          <div>
            <Input onBlur={handleBlur} onChange={handleChange} value={values.email} variant="bordered" style={{ border: 'none', boxShadow: 'none' }}  name="email" label="Email"type="email"/>
            {touched.email && errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email}</p>)}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input onBlur={handleBlur} onChange={handleChange} value={values.password} variant="bordered" style={{ border: 'none', boxShadow: 'none' }}  name="password"label="Password"type="password"/>
              {touched.password && errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password}</p>)}
            </div>

            <div>
              <Input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} variant="bordered" style={{ border: 'none', boxShadow: 'none' }}  name="confirmPassword" label="Confirm Password"type="password"/>
              {touched.rePassword && errors.rePassword && (<p className="text-red-500 text-sm mt-1">{errors.rePassword}</p>)}
            </div>
          </div>

          <div>
            <Input onBlur={handleBlur} onChange={handleChange} value={values.Phone} variant="bordered" style={{ border: 'none', boxShadow: 'none' }} name="Phone" label="Phone" type="tel"/>
            {touched.Phone && errors.Phone && (<p className="text-red-500 text-sm mt-1">{errors.Phone}</p>)}
          </div>

          <Button type="submit" color="success" className="w-2/5 mx-auto">Register</Button>
          </div>
      </form>
    </div>
  );
}
