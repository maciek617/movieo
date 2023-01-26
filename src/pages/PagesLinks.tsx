import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import IntroPage from './IntroPage';
import Signup from './auth/Signup';
import Login from './auth/Login';

function PagesLinks() {
  return (
    <Routes>
      <Route path='/' element={<IntroPage />}></Route>
      <Route path='/home' element={<HomePage />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
  );
}

export default PagesLinks;
