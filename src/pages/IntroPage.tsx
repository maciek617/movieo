import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import IntroImg from '../assets/intro-bg.jpg';
import CookiesInfo from '../components/CookiesInfo';

function IntroPage() {
  const navigate = useNavigate();

  const navigateToProperTab = () => {
    document.cookie.includes('wasLoggedIn')
      ? navigate('/login')
      : navigate('/signup');
  };

  return (
    <>
      <div className='bg-filtr h-screen w-full text-white text-center'>
        <img
          src={IntroImg}
          alt='Background image'
          className='h-full w-full absolute -z-10 object-cover'
        />
        <div className='mt-80'>
          <p className='text-6xl md:text-8xl font-semibold'>
            Movie<span className='text-main-yellow'>o</span>
          </p>
          <h1 className='font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'>
            Recommend, Review, Rate & Share
          </h1>
          <Button text='Join in!' addClasses='mt-10' fn={navigateToProperTab} />
        </div>
        <CookiesInfo />
      </div>
      <div className='h-screen'></div>
    </>
  );
}

export default IntroPage;
