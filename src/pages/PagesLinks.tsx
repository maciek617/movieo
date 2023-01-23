import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';

function PagesLinks() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
    </Routes>
  );
}

export default PagesLinks;
