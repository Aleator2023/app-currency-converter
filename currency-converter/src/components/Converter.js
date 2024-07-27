import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Converter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('RUB');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setCurrencies(Object.keys(response.data.rates));
      } catch (err) {
        setError('Error fetching currencies.');
      }
    };

    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    setError('');
    setResult(null);

    if (isNaN(amount) || amount === '') {
      setError('Please enter a valid number');
      return;
    }

    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      if (!rate) {
        setError('Invalid currency code.');
        return;
      }
      setResult((amount * rate).toFixed(2));
    } catch (err) {
      setError('Error fetching exchange rate.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
      <div className="mb-4">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="border p-2 w-full rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">From:</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="border p-2 w-full rounded"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">To:</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="border p-2 w-full rounded"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleConvert} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Convert
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {result && <div className="mt-4">Result: {result}</div>}
    </div>
  );
};

export default Converter;