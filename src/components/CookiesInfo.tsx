import React from 'react';
import CookiesImg from '../assets/cookies.svg';
import Button from './Button';
import { useState, useEffect } from 'react';

function CookiesInfo() {
  const [showModal, setShowModal] = useState(false);
  const cookie = document.cookie.includes('acceptCookie');

  useEffect(() => {
    cookie ? setShowModal(false) : setShowModal(true);
  });

  const setAcceptCookie = () => {
    document.cookie =
      'acceptCookie=true; expires=Mon, 01 Jan 2024 12:00:00 UTCl path=/';
    setShowModal(false);
  };
  return showModal ? (
    <div className='fixed top-0 left-0 w-full h-screen darken-bg flex items-center justify-center'>
      <div className='bg-white w-72 p-4 rounded-lg shadow'>
        <img
          src={CookiesImg}
          alt='Cookies icon'
          className='w-32 h-32 mx-auto'
        />
        <h2 className='text-black text-2xl font-semibold py-2'>Cookies!</h2>
        <p className='text-main-dark'>
          We use cookies to make your experience better
        </p>
        <div className='mt-5 flex justify-between'>
          <Button text='Privacy Policy' />
          <Button text='OK' fn={setAcceptCookie} />
        </div>
      </div>
    </div>
  ) : null;
}

export default CookiesInfo;
