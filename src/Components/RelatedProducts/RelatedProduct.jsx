import React from 'react'
import Product from '../../Components/Product/Product';
import Slider from "react-slick";

export default function RelatedProduct({relatedProduct}) {

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
      };


  return (

    <Slider {...settings} className='p-5'>
         {
              relatedProduct.map((product , index) => {
             return <div className='px-2'><Product key={index} product={product}/></div>
            })
        }
    </Slider>
  )
}
