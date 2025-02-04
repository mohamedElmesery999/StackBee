import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from '@heroui/react'
export default function Home() {

   const [products , setProducts] = useState([])

      useEffect(() => {
        getAllProducts()
      },[])

  async function getAllProducts(){
      const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      setProducts(data.data);
      
    }

  return (
    <div className='container'>
       <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
       {
        products.map((product , index) => {
         return <div className="mx-auto w-full transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 cursor-pointer shadow-md duration-300 hover:scale-105 hover:shadow-lg">
         <img className=" w-full object-contain object-center" src={product.imageCover} alt="Product Image" />
         <div className="p-4">
           <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900 line-clamp-1">{product.title}</h2>
           <p className="mb-2 text-base dark:text-gray-300 text-gray-700 line-clamp-3">{product.description}</p>
           <div className="flex items-center">
             <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">${product.price - 20}</p>
             <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">{product.price + 5}</p>
             <p className="ml-auto text-base font-medium text-green-500">20% off</p>
           </div>
           <Button color="success" variant='bordered' className='mt-4 w-full' endContent={<i className="fa-solid fa-cart-shopping"></i>}>
               Add To Cart
          </Button>
         </div>
       </div>
         })
       }
       </div>
    </div>

  )
}
