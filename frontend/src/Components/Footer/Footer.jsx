import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
            <p>© 2024 Your Platform Name. All rights reserved.</p>
          </div>
          <div className="w-full md:w-auto text-center md:text-right">
            <Link to="/adminLogin" className="text-gray-400 hover:text-white text-sm">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
