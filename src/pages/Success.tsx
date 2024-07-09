import React from 'react';


const Success: React.FC = () => {


  const handleContinueShopping = () => {
    window.location.href=('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-green-500 mb-4">Payment Successful!</h2>
        <p className="text-gray-700 mb-6">Thank you for your purchase. Your payment was processed successfully.</p>
        <button
          onClick={handleContinueShopping}
          className="w-full px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Success;
