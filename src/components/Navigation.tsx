import { useNavigate } from 'react-router-dom';
import { signoutUser } from '../helpers/SignUserOut';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/currentUser';
import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from './Button';

const activeStyle = {
  color: '#FFC700',
};

interface NavigationProps {
  user: any;
}

function Navigation({ ...props }: NavigationProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [changeBgColor, setChangeBgColor] = useState<boolean>(false);
  // console.log(props.user);

  // Add class on scroll to navigation
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 25 ? setChangeBgColor(true) : setChangeBgColor(false);
    });

    return () => {
      window.removeEventListener('scroll', () => {
        window.scrollY > 25 ? setChangeBgColor(true) : setChangeBgColor(false);
      });
    };
  }, []);

  // Stop displaying profile dropdown when user clicks outside of the area
  useEffect(() => {
    window.addEventListener('click', (e: any) => {
      !e.target.classList.contains('profile') && setShowDropdown(false);
    });

    return () => {
      window.removeEventListener('click', (e: any) => {
        !e.target.classList.contains('profile') && setShowDropdown(false);
      });
    };
  }, []);

  return (
    <nav
      className={`${
        changeBgColor ? 'darken-bg' : 'bg-main-dark'
      } fixed z-40 top-0 left-0 flex items-center justify-between w-full px-6 py-5 transition-all md:px-24`}
    >
      <div>
        <Link to={'/home'}>
          <p className='text-white text-3xl'>
            Movie<span className='text-main-yellow'>o</span>
          </p>
        </Link>
      </div>
      <div className='flex items-center  relative'>
        <ul className='relative hidden  lg:flex items-center gap-10  text-white lg:text-md xl:text-xl'>
          <NavLink
            to='browse/most-popular/netflix/action'
            className={'cursor-pointer hover:text-main-yellow transition-all'}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Browse Films
          </NavLink>
          <NavLink
            to='coming'
            className={'cursor-pointer hover:text-main-yellow transition-all'}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Upcoming movies
          </NavLink>
          <NavLink
            to='what-to-watch'
            className={'cursor-pointer hover:text-main-yellow transition-all'}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            What to watch?
          </NavLink>
          <NavLink
            to='blog'
            className={'cursor-pointer hover:text-main-yellow transition-all'}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Blog
          </NavLink>
        </ul>
      </div>
      {props.user?.confirmed_at ||
      (localStorage.getItem('isLoggedIn') && props.user?.confirmed_at) ||
      localStorage.getItem('sb-uzlcyjmxvoczytwcmscx-auth-token') ? (
        <div
          className='profile relative'
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className=' w-10 h-10 rounded-full border-2 flex items-center justify-center border-main-yellow cursor-pointer lg:w-9 lg:h-9 xl:w-11 xl:h-11'>
            <p className='profile text-white font-bold text-xl'>
              {props.user?.user_metadata.img ? (
                <img
                  src={props.user?.user_metadata.img}
                  alt='profile picture'
                  className='profile mr-5 w-10 h-10 rounded-full object-cover'
                />
              ) : (
                props.user?.user_metadata?.name[0]
              )}
            </p>
          </div>
          <div
            className={`text-white bg-gray-700 absolute top-full right-0 w-40 rounded-sm mt-3 shadow ${
              showDropdown ? 'animate-fade' : 'hidden'
            }`}
          >
            <Link to={'/profile/' + props.user?.id}>
              <p className='p-2 hover:text-main-yellow transition-all'>
                <i className='fa-solid fa-user mr-2'></i>
                Profile
              </p>
            </Link>
            <Link to={'/profile/' + props.user?.id}>
              <p className='p-2 hover:text-main-yellow transition-all'>
                <i className='fa-solid fa-magnifying-glass mr-2'></i>
                My Reviews
              </p>
            </Link>
            <Link to={'/support'}>
              <p className='p-2 hover:text-main-yellow transition-all'>
                <i className='fa-solid fa-headset mr-2'></i>
                Support
              </p>
            </Link>
            <li
              className='list-none cursor-pointer hover:text-main-yellow transition-all p-2 border-t-2'
              onClick={() =>
                signoutUser(navigate, dispatch, updateUser, props.user?.id)
              }
            >
              <i className='fa-solid fa-right-from-bracket mr-2'></i>
              Logout
            </li>
          </div>
        </div>
      ) : (
        <Link to={document.cookie.includes('wasLoggedIn') ? 'login' : 'signup'}>
          <Button text='Get started' />
        </Link>
      )}
    </nav>
  );
}

export default Navigation;
