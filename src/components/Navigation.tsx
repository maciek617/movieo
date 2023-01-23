import React from 'react';

function Navigation() {
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
          {/* TODO: Links to pages */}
          <li className='cursor-pointer'>Browse Films</li>
          <li className='cursor-pointer'>Coming soon</li>
          <li className='cursor-pointer'>Blog</li>
        </ul>
        <div>
          <div className='bg-red-400 w-8 h-8 rounded-full cursor-pointer lg:w-10 lg:h-10 xl:w-12 xl:h-12'></div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
