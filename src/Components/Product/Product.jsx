import React from 'react'
import { Button } from '@heroui/react'
import { Link, useNavigate } from 'react-router-dom'
import { addProductToCart } from '../Services/cartServices'

export default function Product({product, isLoggedin}) {
  const navigate = useNavigate();

  const handleProductClick = () => {
    if (!isLoggedin) {
      navigate('/login');
    } else {
      navigate(`/product/${product._id}`);
    }
  };

  return (
        <div className="mx-auto w-full flex flex-col justify-between transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 cursor-pointer shadow-md  hover:shadow-lg">

            {/* M. products details */}
            <div onClick={handleProductClick} className="h-full">
                <div className="overflow-hidden">
                     <img className=" w-full object-contain object-center duration-300 hover:scale-[103%]" src={product.imageCover} alt="Product Image" />
                </div>
                <div className="p-4 pb-0">
                <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900 line-clamp-1">{product.title}</h2>
                <p className="mb-2 text-base dark:text-gray-300 text-gray-700 line-clamp-3">{product.description}</p>
                <div className="flex items-center">
                    <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">EGP {product.price - 20}</p>
                    <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">{product.price + 5}</p>
                    <p className="ml-auto text-base font-medium text-green-500">20% off</p>
                </div>
                </div>
            </div>

            {/* M. add to cart btn 1 */}
            <div className="m-4 ">
                <Button onPress={() => addProductToCart(product._id)} color="success" variant='bordered' className='w-full' endContent={<i className="fa-solid fa-cart-shopping"></i>}>
                    Add To Cart
                </Button>
            </div>
        </div>
      
  )
}