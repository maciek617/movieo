import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from '../App';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/currentUser';
import { Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import IntroPage from './IntroPage';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Browse from './Browse';
import ComingSoon from './ComingSoon';
import WhatToWatch from './WhatToWatch';
import Blog from './Blog';
import WaitForEmailConfritmation from './auth/WaitForEmailConfritmation';
import AddMovie from './browse-film/add-movie/AddMovie';
import SingleFilms from './film/SingleFilms';
import Profile from './profile/Profile';
import EditReview from './film/film_edit/EditReview';

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
      <Route path='/browse/:m/:p/:t' element={<Browse />}></Route>
      <Route
        path='/add-movie'
        element={
          <ProtectedRoute user={'isLoggedIn'}>
            <AddMovie />
          </ProtectedRoute>
        }
      ></Route>
      <Route path='/movie/:id' element={<SingleFilms />}></Route>
      <Route path='/coming' element={<ComingSoon />}></Route>
      <Route path='/what-to-watch' element={<WhatToWatch />}></Route>
      <Route path='/blog' element={<Blog />}></Route>
      <Route path='/profile/:id' element={<Profile />}></Route>
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
      <Route
        path='/movie/:id/edit'
        element={
          <ProtectedRoute user={'isLoggedIn'}>
            <EditReview />
          </ProtectedRoute>
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
