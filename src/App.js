import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';  
import HomePage from './HomePage';
import Taskbar from './Taskbar';
import CartPage from './CartPage';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [cart, setCart] = useState([]);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <Taskbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />  {/* Add Register route */}
        <Route
          path="/homepage"
          element={
            isLoggedIn ? (
              <HomePage cart={cart} setCart={setCart} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/cart"
          element={
            isLoggedIn ? (
              <CartPage cart={cart} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
