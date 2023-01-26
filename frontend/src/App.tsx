import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  const checkUserToken = () => {
    const userToken = localStorage.getItem('token');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
            <Route path="/home">
              <Route index element={<Home />} />
            </Route>
          ) : (
            <Route path="/">
              <Route index element={<Login />} />
            </Route>
          )}

          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
