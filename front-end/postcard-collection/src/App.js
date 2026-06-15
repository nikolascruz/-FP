import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListPostcards from './pages/ListPostcards';
import Postcard from './pages/Postcard';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ListPostcards />} />
          <Route path="/postcard/:id" element={<Postcard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
