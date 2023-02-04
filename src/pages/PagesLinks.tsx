import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from '../App';
import HomePage from './HomePage';
import IntroPage from './IntroPage';
import Signup from './auth/Signup';
import Login from './auth/Login';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/currentUser';
import { Navigate } from 'react-router-dom';
import Browse from './Browse';
import ComingSoon from './ComingSoon';
import WhatToWatch from './WhatToWatch';
import Blog from './Blog';
import WaitForEmailConfritmation from './auth/WaitForEmailConfritmation';

function PagesLinks() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      dispatch(updateUser(user));
    };
    getUser();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<IntroPage />}></Route>
      <Route
        path='/home'
        element={
          <ProtectedRoute user={'isLoggedIn'}>
            <HomePage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path='/browse'
        element={
          <ProtectedRoute user={'isLoggedIn'}>
            <Browse />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path='/coming'
        element={
          <ProtectedRoute user={'isLoggedIn'}>
            <ComingSoon />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path='/what-to-watch'
        element={
          <ProtectedRoute user={'isLoggedIn'}>
            <WhatToWatch />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path='/blog'
        element={
          <ProtectedRoute user={'isLoggedIn'}>
            <Blog />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path='/signup'
        element={
          <ProtectedRouteSignedUser user={'isLoggedIn'}>
            <Signup />
          </ProtectedRouteSignedUser>
        }
      ></Route>
      <Route
        path='/wait-for-email'
        element={<WaitForEmailConfritmation />}
      ></Route>
      <Route
        path='/login'
        element={
          <ProtectedRouteSignedUser user={'isLoggedIn'}>
            <Login />
          </ProtectedRouteSignedUser>
        }
      ></Route>
    </Routes>
  );
}
const ProtectedRoute = ({ user, children }: { user: any; children: any }) => {
  if (!localStorage.key(1)?.includes('auth')) {
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
  if (localStorage.key(1)?.includes('auth')) {
    return <Navigate to={'/home'} replace />;
  }
  return children;
};

export default PagesLinks;
