import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-4">Oops! Something went wrong.</h1>
          <p className="text-lg mb-6">We can't find the page you're looking for.</p>
          <a href="/" className="text-blue-400 hover:underline">Go back to Home</a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ErrorPage;
