import React from 'react';
import { Link } from 'react-router-dom';
import Converter from '../components/Converter';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Converter />
      <Link to="/rates">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Current Rates
        </button>
      </Link>
    </div>
  );
};

export default HomePage;