import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Rates = ({ baseCurrency }) => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        setRates(response.data.rates);
      } catch (err) {
        setError('Error fetching exchange rates.');
      }
      setLoading(false);
    };

    fetchRates();
  }, [baseCurrency]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4">Exchange Rates (Base: {baseCurrency})</h1>
      <ul>
        {Object.entries(rates).map(([currency, rate]) => (
          <li key={currency} className="mb-2">
            1 {baseCurrency} = {rate} {currency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rates;