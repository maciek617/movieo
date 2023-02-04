import React from 'react';
// Whole swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay, Lazy } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/lazy';

// Images
import bgImg from '../assets/bg-film.png';
import bgImg1 from '../assets/bg-film2.jpg';
import bgImg2 from '../assets/bg-film3.jpg';
import star from '../assets/star.svg';

// Components
import Button from '../components/Button';
import { useSelector } from 'react-redux';

function HomePage() {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  // Here data fetched from Firebase
  const tempData = [
    {
      title: 'Sex Education',
      rating: 9.1,
      type: 'Comedy',
      year: '2020',
      time: '2h 32min',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed corporis ad porro labore vero ipsum dolorum voluptates tenetur nesciunt consequuntur quia eius, aliquam ullam quaerat delectus cupiditate quam quis maiores.',
      img: bgImg,
    },
    {
      title: 'The 100',
      rating: 9.9,
      type: 'Science Fiction',
      year: '2014',
      time: '12h 12min',
      description: 'Some junk text to se if this works properly',
      img: bgImg1,
    },
    {
      title: 'Anarchy',
      rating: 4.3,
      type: 'Horror',
      year: '2019',
      time: '1h 32min',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed corporis ad porro labore vero ipsum dolorum voluptates tenetur nesciunt consequuntur quia eius...',
      img: bgImg2,
    },
  ];

  // console.log(currentUser.confirmed_at);

  const slides = tempData.map((slide, index) => {
    return (
      <SwiperSlide key={index}>
        <div className='h-screen'>
          <div className='bg-filtr h-full w-full'></div>
          <img
            src={slide.img}
            alt='background image'
            className='h-full w-full object-cover swiper-lazy'
          />
        </div>

        <div className='max-w-xl w-full text-white absolute bottom-10 left-0 px-6 md:bottom-24 md:left-16 lg:bottom-48 lg:left-24 lg:px-0'>
          <h1 className='text-3xl lg:text-7xl font-bold'>{slide.title}</h1>
          <div className='text-xs flex items-center justify-between mt-5 font-semibold md:text-base lg:text-lg'>
            <div className='flex items-center'>
              <img src={star} alt='star icon' className='mr-2' />
              <p>{slide.rating}/10</p>
            </div>
            <p>{slide.type}</p>
            <p>{slide.year}</p>
            <p>{slide.time}</p>
          </div>
          <div className='max-w-md mt-5'>
            <p>{slide.description}</p>
          </div>
          <Button text='Review' icon={true} addClasses='my-5 lg:my-0 lg:mt-5' />
        </div>
      </SwiperSlide>
    );
  });

  return (
    <div>
      <div className='h-screen relative'>
        <Swiper
          modules={[EffectFade, Pagination, Autoplay, Lazy]}
          spaceBetween={0}
          effect={'fade'}
          slidesPerView={1}
          allowTouchMove={false}
          lazy={true}
          autoplay={{
            delay: 10000,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
        >
          {slides}
        </Swiper>
      </div>
      {currentUser?.id && (
        <p className='animate-slide-left fixed z-40 top-40 left-6 text-white text-xl md:left-24 lg:top-52 md:text-2xl lg:text-4xl'>
          Hello,{' '}
          <span className='font-bold'>{currentUser.user_metadata.name}</span>
          <span className='block'>
            What will you <span className='text-main-yellow'>review</span>{' '}
            today?{' '}
          </span>
        </p>
      )}
    </div>
  );
}

export default HomePage;
