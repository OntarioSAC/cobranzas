// layout.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home';

const Layout = () => {
  const basename = process.env.BASENAME || '';

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
