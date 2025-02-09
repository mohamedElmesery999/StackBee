import React from "react";
import Product from "../../Components/Product/Product";
import Slider from "react-slick";

export default function RelatedProduct({ relatedProduct = [] }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(5, relatedProduct.length), // Adjust slides dynamically
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1280, // XL screens
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 1024, // Large screens
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 768, // Tablets
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480, // Mobile
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>

      {relatedProduct.length > 0 ? (
        <Slider {...settings} className="p-2">
          {relatedProduct.map((product) => (
            <div key={product._id} className="px-2">
              <Product product={product} />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-gray-500 text-center">No related products found.</p>
      )}
    </div>
  );
}
