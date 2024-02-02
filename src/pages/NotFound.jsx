// NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-96 ">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mb-8">Page Not Found</p>
        <p className="text-lg text-gray-700">
          Oops! The page you're looking for might have been removed or is temporarily unavailable.
        </p>
        <a href="/" className="text-blue-500 hover:underline mt-4 block">Go back to the home page</a>
      </div>
    </div>
  );
};

export default NotFound;
