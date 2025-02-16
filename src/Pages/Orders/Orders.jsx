import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../Contexts/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Orders() {
  const { userId } = useContext(authContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserOrders();
  }, []);

  function getUserOrders() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then(({ data }) => {
        setOrders(data);
      })
      .catch(err => console.error("Error fetching orders:", err));
  }

  return (
    <div className="space-y-4">
    {orders.slice().reverse().map((order, index) => (     //M. Reverse the order of orders
      <div key={index} className="p-4 border rounded-lg">
        {/* Order Header */}
        <div className="mb-4 pb-2 border-b">
          <h3 className="font-bold">Order ID: {order._id}</h3>
          <p>Total Price: EGP {order.totalOrderPrice.toFixed(2)}</p>
        </div>
  
        {order.cartItems.map((item, index) => (
          <div key={index} className="flex gap-4 p-2 mb-2 bg-gray-50 rounded">
            <img
              src={item.product.imageCover}
              alt={item.product.title}
              className="w-20 h-20 object-cover rounded"
            />
  
            <div className="flex-1">
              <h4 className="font-semibold">{item.product.title}</h4>
  
              <div className="text-sm text-gray-600">
                <p>Price: EGP {item.price.toFixed(2)}</p>
                <p>Quantity: {item.count}</p>
                <p className="font-medium">
                  Total: EGP {(item.price * item.count).toFixed(2)}
                </p>
              </div>
  
              <div className="mt-2 text-sm text-gray-500">
                <span>Brand: {item.product.brand?.name}</span>
                <span className="mx-2">|</span>
                <span>Category: {item.product.category?.name}</span>
              </div>
            </div>
          </div>
        ))}
  
        <div className="mt-4 pt-2 border-t">
          <p>Shipping Address: {order.shippingAddress.details}</p>
          <p>City: {order.shippingAddress.city}</p>
          <p>Phone: {order.shippingAddress.phone}</p>
        </div>
      </div>
    ))}
  
    <div>
      <Link to={"/"}className="mt-3 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
        Back to Home
      </Link>
    </div>
  </div>
  )
  }

