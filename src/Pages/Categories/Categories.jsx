import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen'

export default function Categories() {


  function getAllCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  const {data , isLoading} = useQuery({
    queryKey: ["categories"],
    queryFn : getAllCategories,
    select : (data) => data.data.data
  })

   if(isLoading){
        return <LoadingScreen/>
      }

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Categories</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.map((category, index) => (
        <div key={index} className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-60 h-60 object-cover rounded-full mb-3"
          />
          <h3 className="text-lg font-semibold text-gray-700">{category.name}</h3>
        </div>
      ))}
    </div>
  </div>
  
  )
}
