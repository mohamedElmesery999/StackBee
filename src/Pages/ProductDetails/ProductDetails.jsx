import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen'
import Slider from "react-slick";
import RelatedProduct from '../../Components/RelatedProducts/RelatedProduct';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { addProductToCart } from '../../Components/Services/cartServices';


export default function ProductDetails({index}) {
    let {id} = useParams()
    const[productData , setProductData] = useState(null)
    const [isLoading, setIsLoading] = useState(true); 
    const[relatedProduct , setRelatedProduct] = useState([])

    // ====================== Arrows and slider 
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    // ============  end Arrows and slider 

    useEffect(() => {
        getProductsDetails()
        
    }, [])

    async function getProductsDetails() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id );
            setProductData(data.data);
            getRelatedProducts(data.data.category._id);
            
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setIsLoading(false); 
        }
    }

    async function getRelatedProducts(categoryId){
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`)
        setRelatedProduct(data.data);
        
    }

       if(isLoading){
         return <LoadingScreen/>
       }

    if (!productData) {
        return <div className="text-center text-red-500">Product not found</div>;
    }


    return (
        <div className="container mx-auto px-4 max-w-7xl mt-9">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image Section */}
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-square">
                <Slider {...settings} className="h-full">
                  {productData?.images.map((img, index) => (
                    <div key={index} className="aspect-square">
                      <img
                        src={img}
                        alt={`${productData.title} - View ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <button 
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart className="w-6 h-6  text-red-500" />
              </button>
            </div>
    
            {/* Product Details Section */}
            <div className="w-full lg:w-1/2 space-y-6 ">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {productData.title}
                </h1>
                <p className="text-gray-600">
                  {productData.description}
                </p>
              </div>
    
              <div className="flex items-center gap-3">
                <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">
                  {productData.ratingsAverage}★
                </span>
                <span className="text-sm text-gray-500">
                  {productData.ratingsQuantity} reviews
                </span>
              </div>
    
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${productData.price}
                  </span>
                  <span className="text-sm font-medium text-gray-500 line-through">
                    ${productData.price + 20}
                  </span>
                </div>
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  Save 20%
                </span>
              </div>
    
              <p className="text-green-600 text-sm font-semibold">
                Free Delivery
              </p>
    
              <div className="flex flex-col sm:flex-row gap-4">
             
                <button onClick={() => addProductToCart(productData?._id)} className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
    
         {/* Related Products Section */}
         <div className="mt-12">
            <RelatedProduct relatedProduct={relatedProduct} index={index}/>
          </div>
        </div>
      );
    };