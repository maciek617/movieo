import React from 'react';
import Button from '../components/Button';
import IntroImg from '../assets/intro-bg.jpg';
function IntroPage() {
  return (
    <div className='bg-filtr h-screen w-full text-white text-center'>
      <img
        src={IntroImg}
        alt='Background image'
        className='h-full w-full absolute -z-10 object-cover'
      />
      <div className='mt-52'>
        <p className='text-6xl md:text-8xl font-semibold'>
          Movie<span className='text-main-yellow'>o</span>
        </p>
        <h1 className='font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'>
          Recommend, Review, Rate & Share
        </h1>
        <Button text='Join in!' addClasses='mt-10' />
      </div>
    </div>
  );
}

export default IntroPage;
