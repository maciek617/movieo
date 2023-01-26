import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomePage from './HomePage';
import IntroPage from './IntroPage';
import Signup from './auth/Signup';
import Login from './auth/Login';

const ProtectedRoute = ({ user, children }: { user: any; children: any }) => {
  if (!user) {
    return <Navigate to={'/'} replace />;
  }
  return children;
};

const ProtectedRouteSignedUser = ({
  user,
  children,
}: {
  user: any;
  children: any;
}) => {
  if (user) {
    return <Navigate to={'/home'} replace />;
  }
  return children;
};

function PagesLinks() {
  const currentUser = useSelector((state: any) => state.currentUser.value);

  return (
    <Routes>
      <Route path='/' element={<IntroPage />}></Route>
      <Route
        path='/home'
        element={
          <ProtectedRoute user={currentUser}>
            <HomePage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path='/signup'
        element={
          <ProtectedRouteSignedUser user={currentUser}>
            <Signup />
          </ProtectedRouteSignedUser>
        }
      ></Route>
      <Route
        path='/login'
        element={
          <ProtectedRouteSignedUser user={currentUser}>
            <Login />
          </ProtectedRouteSignedUser>
        }
      ></Route>
    </Routes>
  );
}

export default PagesLinks;
