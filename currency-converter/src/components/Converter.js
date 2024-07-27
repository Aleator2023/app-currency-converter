import React, { useState } from 'react';
import axios from 'axios';

const Converter = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    setError('');
    setResult(null);

    const parts = input.trim().split(' ');

    if (parts.length !== 4 || parts[2].toLowerCase() !== 'in' || isNaN(parts[0])) {
      setError('Please enter a valid format: [amount] [from currency] in [to currency]');
      return;
    }

    const [amount, from, , to] = parts;

    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from.toUpperCase()}`);
      const rate = response.data.rates[to.toUpperCase()];
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
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g., 15 usd in rub"
        className="border p-2 w-full mb-4 rounded"
      />
      <button onClick={handleConvert} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Convert</button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {result && <div className="mt-4">Result: {result}</div>}
    </div>
  );
};

export default Converter;