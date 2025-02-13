import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../Contexts/AuthContext';
import axios from 'axios';

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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Your Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="border-b border-gray-300 py-4">
            <h3 className="text-lg font-medium text-gray-800">Order ID: {order._id}</h3>
            <h3 className="text-lg font-medium text-gray-800">Name: {order.name}</h3>
            <img type={order.image}/>
            <p className="text-gray-600">Total Price: <span className="font-semibold">EGP {order.totalPrice}</span></p>
            <p className="text-gray-600">Status: <span className="text-green-600">{order.status}</span></p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
}
