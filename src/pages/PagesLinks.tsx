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
import ReportPage from './report/ReportPage';
import Support from './Support';
import SupportPageTicket from './support-page/SupportPageTicket';
import { useSelector } from 'react-redux';
import EditProfile from './profile/edit-profile/EditProfile';

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
      <Route
        path='/profile/:id'
        element={
          <ProtectedRoute user={'isLoggedIn'}>
            <Profile />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path='/profile/:id/edit'
        element={
          <ProtectedRoute user={'isLoggedIn'}>
            <EditProfile />
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
      <Route
        path='/movie/:id/edit'
        element={
          <ProtectedRoute user={'isLoggedIn'}>
            <EditReview />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path='/report'
        element={
          <ProtectedRoute user={'isLoggedIn'}>
            <ReportPage />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path='/support'
        element={
          <ProtectedRoute user={'isLoggedIn'}>
            <Support />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path='/support/:id'
        element={
          <ProtectedRoute user={'isLoggedIn'}>
            <SupportPageTicket />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

const ProtectedRoute = ({ user, children }: { user: any; children: any }) => {
  const currentUser = useSelector((state: any) => state.currentUser.value);

  if (currentUser !== null && !currentUser?.confirmed_at) {
    return <Navigate to={'/wait-for-email'} replace />;
  }

  if (!localStorage.getItem('sb-uzlcyjmxvoczytwcmscx-auth-token')) {
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
