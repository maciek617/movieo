import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signoutUser } from '../helpers/SignUserOut';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/currentUser';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  color: '#FFC700',
};

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // TODO: Add class after scroll down
  return (
    <nav className='fixed z-40 top-0 left-0 flex items-center justify-between w-full px-24 py-5'>
      <div>
        <p className='text-white text-3xl'>
          Movie<span className='text-main-yellow'>o</span>
        </p>
      </div>
      <div className='flex items-center'>
        <ul className='hidden lg:flex items-center gap-10 mr-5 text-white lg:text-lg xl:text-xl'>
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
          <li
            className='cursor-pointer hover:text-main-yellow transition-all'
            onClick={() => signoutUser(navigate, dispatch, updateUser)}
          >
            Logout
          </li>
        </ul>
        <div>
          <div className='bg-red-400 w-7 h-7 rounded-full border-2 border-main-yellow cursor-pointer lg:w-9 lg:h-9 xl:w-11 xl:h-11'></div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
