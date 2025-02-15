import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CatalogoPage from './components/CatalogoPage';
import CakeDesignerPage from './pages/CakeDesignerPage';
import TrabajoPage from './components/TrabajoPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<CatalogoPage />} />
          <Route path="/design" element={<CakeDesignerPage />} />
          <Route path="/trabaja-con-nosotros" element={<TrabajoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;