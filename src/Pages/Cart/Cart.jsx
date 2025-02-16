import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartProduct from '../../Components/CartProduct/CartProduct'
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen'


export default function Cart() {

  const[cartId , setCartId] =  useState(null)
  const[cartdata , setCartData] =  useState(null)
  const[numOfCartItems , setNumOfCartItems] =  useState(0)
  const [isLoading , setIsLoading] = useState(true)
 


  useEffect(() => {
    getLoggedUserCart()
  }, [])
  
  async function getLoggedUserCart(){
    setIsLoading(true)
      const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
        headers:{
          token: localStorage.getItem("token")
        }
      } )
      setCartId(data.cartId);
      setCartData(data.data);
      setNumOfCartItems(data.numOfCartItems);  
      setIsLoading(false)  
  }

  async function removeCartProduct(productId) {
    const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
      headers: {
        token : localStorage.getItem("token")
      }
    })
    setCartData(data.data);
    setNumOfCartItems(data.numOfCartItems);     
    
    toast.error('Cart Deleted !!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce
      });
  }

  async function clearAllCart() {
    const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
      headers: {
        token : localStorage.getItem("token")
      }
    })
    setCartData(null);
    setNumOfCartItems(0);     
    
    toast.error('The cart has been removed !!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce
      });
  }


  function updateProductCounter(productId, count ) {
   

    axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => {
      setCartData(data.data);
      setNumOfCartItems(data.numOfCartItems);
    })
    .catch((error) => {
      console.error("Error updating cart:", error);
    })
    .finally(() => {
    
    });
  }

  if (numOfCartItems === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" 
          alt="Empty Cart"
          className="w-32 h-32 opacity-70"
        />
        <h1 className="text-2xl font-semibold text-gray-700 mt-4">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mt-2">
          Looks like you haven’t added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="mt-5 px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  if(isLoading){
    return <LoadingScreen/>
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
                            cartdata?.products.map((product , index) =>{
                            return <CartProduct key={index} product={product} removeCartProduct={removeCartProduct} updateProductCounter={updateProductCounter}/>
                            })
                          }

                        {/* ========================= end cart  */}

                <div className="flex items-center justify-between mt-8">
                    <button onClick={() => clearAllCart()}
                        className="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 group font-semibold text-lg leading-8 text-red-500 shadow-sm shadow-transparent transition-all duration-500 hover:text-red-700">
                        Clear Cart  
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
                           
                        </div>
                        <div className="flex items-center justify-between py-8">
                            <p className="font-medium text-xl leading-8 text-black">Total Price </p>
                            <p className="font-semibold text-xl leading-8 text-red-600">EGP {cartdata?.totalCartPrice}</p>
                        </div>
                        <Link to={"/formcheck/" + cartId} onPress={() => checkOut(cartId)}
                            className="w-full block text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700 mb-8">Checkout</Link>
                    </div>

                </div>
              </div>
            
            </div>
        </div>
    </div>
</section>
                                        
  )
}
