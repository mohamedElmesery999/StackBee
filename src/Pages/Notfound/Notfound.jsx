import React from 'react';
import not from '../../assets/not.png';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <img src={not} alt="Not Found" className="max-w-md w-full h-auto object-contain" />
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-500 mt-2">The page you are looking for doesn’t exist or has been moved.</p>
      <a href="/" className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
        Go Home
      </a>
    </div>
  );
}
