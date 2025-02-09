import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartProduct from '../../Components/CartProduct/CartProduct'

export default function Cart() {

  const[cartId , setCartId] =  useState(null)
  const[cartdata , setCartData] =  useState(null)
  const[numOfCartItems , setNumOfCartItems] =  useState(null)

  useEffect(() => {
    getLoggedUserCart()
  }, [])
  
  async function getLoggedUserCart(){

      const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
        headers:{
          token: localStorage.getItem("token")
        }
      } )
      setCartId(data.cartId);
      setCartData(data.data);
      setNumOfCartItems(data.numOfCartItems);
      
  }

  return (
    <section
    className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
    <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
        <div className="grid grid-cols-12">
            <div
                className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                    <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                    <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{numOfCartItems} Items</h2>
                </div>

                <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                    <div className="col-span-12 md:col-span-7">
                        <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                        <div className="grid grid-cols-5">
                            <div className="col-span-3">
                                <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                            </div>
                            <div className="col-span-2">
                                <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                            </div>
                        </div>
                    </div>
                </div>

                        {/* ========================= start cart  */}

                          {
                            cartdata?.products.map((product) =>{
                            return <CartProduct product={product}/>
                            })
                          }

                        {/* ========================= end cart  */}

                <div className="flex items-center justify-end mt-8">
                    <button
                        className="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 group font-semibold text-lg leading-8 text-indigo-600 shadow-sm shadow-transparent transition-all duration-500 hover:text-indigo-700">
                        Add Coupon Code
                        <svg className="transition-all duration-500 group-hover:translate-x-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                            fill="none">
                            <path
                                d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                                stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ================================== the right side =====================================*/}
            <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg  mx-auto lg:pl-8 py-24">
              <div className="sticky bg-green-100 border rounded-lg top-40">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300 text-center mt-8">
                    Order Summary</h2>
                <div className="mt-8 px-3">
                    <div className="flex items-center justify-between pb-6">
                        <p className="font-normal text-lg leading-8 text-black">{numOfCartItems} Items</p>
                        <p className="font-medium text-lg leading-8 text-black">EGP {cartdata?.totalCartPrice}</p>
                    </div>

                    <div>
                        <div className="flex items-center border-b border-gray-200">
                            <button
                                className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">Apply</button>
                        </div>
                        <div className="flex items-center justify-between py-8">
                            <p className="font-medium text-xl leading-8 text-black">Total Price </p>
                            <p className="font-semibold text-xl leading-8 text-red-600">EGP {cartdata?.totalCartPrice}</p>
                        </div>
                        <button
                            className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700 mb-8">Checkout</button>
                    </div>

                </div>
              </div>
            
            </div>
        </div>
    </div>
</section>
                                        
  )
}
