import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signoutUser } from '../helpers/SignUserOut';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/currentUser';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';

const activeStyle = {
  color: '#FFC700',
};

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  return (
    <nav className='fixed z-40 top-0 left-0 flex items-center justify-between w-full px-6 py-5 md:px-24'>
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
            to='browse'
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
            Coming soon
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
      <div className='relative'>
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className=' w-7 h-7 rounded-full border-2 border-main-yellow cursor-pointer lg:w-9 lg:h-9 xl:w-11 xl:h-11'
        ></div>
        <div
          className={`text-white bg-gray-700 absolute top-full right-0 w-32 rounded-sm mt-3 shadow ${
            showDropdown ? 'animate-fade' : 'hidden'
          }`}
        >
          <Link to={'/profile/123123123'}>
            <p className='p-2 hover:text-main-yellow transition-all'>
              <i className='fa-solid fa-user mr-2'></i>
              Profile
            </p>
          </Link>
          <li
            className='list-none cursor-pointer hover:text-main-yellow transition-all p-2 border-t-2'
            onClick={() => signoutUser(navigate, dispatch, updateUser)}
          >
            <i className='fa-solid fa-right-from-bracket mr-2'></i>
            Logout
          </li>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
