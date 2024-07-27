import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RatesPage from './pages/RatesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/rates" element={<RatesPage />} />
      </Routes>
    </Router>
  );
}

export default App;