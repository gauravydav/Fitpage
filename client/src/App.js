// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CriteriaPage from './components/CriteriaPage/CriteriaPage';
import ResultPage from './components/ResultPage/ResultPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:name" element={<CriteriaPage />} />
        <Route path="/result/:name/:number" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
