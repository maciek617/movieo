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
import { supabase } from '../App';
import { useState, useEffect } from 'react';
function HomePage() {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const [userData, setUserData] = useState(false);
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

  const getData = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('id', currentUser?.id);

    setUserData(data?.length === 0);
  };

  const insertData = async () => {
    if (!currentUser?.id) return;
    await getData();

    if (userData) {
      console.log('work');

      const { error } = await supabase.from('users').insert({
        id: currentUser?.id,
        created_at: currentUser?.created_at,
        name: currentUser?.user_metadata.name,
        email: currentUser?.email,
        provider: currentUser?.app_metadata.provider,
        last_update: currentUser?.updated_at,
        liked_movies: [],
        last_comment: [],
        badge: 'User',
        date_to_next_generation: null,
        last_active: new Date(),
        image: null,
        brief: 'You can add brief in update profile page.',
        post_length: 0,
        comments_length: 0,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    insertData();
  });

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
        <p className='animate-slide-left absolute z-40 top-40 left-6 text-white text-xl md:left-24 lg:top-52 md:text-2xl lg:text-4xl'>
          Hello,{' '}
          <span className='font-bold'>{currentUser.user_metadata.name}</span>
          <span className='block'>
            What will you <span className='text-main-yellow'>review</span>{' '}
            today?{' '}
          </span>
        </p>
      )}

      <div className='flex justify-center gap-10 py-20 bg-main-dark'>
        <div className='bg-main-yellow 400 max-w-2xl w-full text-center py-32 rounded'>
          <p className='font-bold text-4xl'>Reviews</p>
          <p className='text-8xl font-thin'>
            <span className='font-bold'>+</span>1000
          </p>
        </div>
        <div className='bg-main-yellow 400 max-w-2xl w-full text-center py-32 rounded'>
          <p className='font-bold text-4xl'>Users</p>
          <p className='text-8xl font-thin'>
            <span className='font-bold'>+</span>100
          </p>
        </div>
      </div>

      <div className='bg-main-dark flex items-center justify-center flex-col'>
        <h1 className='text-white text-4xl'>What are you waiting for?</h1>
        <Button text='Start exploring!' addClasses='my-5' />
      </div>
    </div>
  );
}

export default HomePage;
