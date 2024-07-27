import React, { useState } from 'react';
import Rates from '../components/Rates';
import { Link } from 'react-router-dom';

const RatesPage = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Currency Rates</h1>
      <label className="mb-4">
        Base Currency: 
        <input
          type="text"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value.toUpperCase())}
          placeholder="Base Currency (e.g., USD)"
          className="border p-2 ml-2 rounded"
        />
      </label>
      <Rates baseCurrency={baseCurrency} />
      <Link to="/">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Go to Converter</button>
      </Link>
    </div>
  );
};

export default RatesPage;