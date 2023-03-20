import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay, Lazy } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/lazy';
import star from '../assets/star.svg';

// Components
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { supabase } from '../App';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
function HomePage() {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const [userData, setUserData] = useState(false);
  const [threeFilmsData, setThreeFilmsData] = useState<any>();
  const [expandBrief, setExpandBrief] = useState<boolean>(false);
  const [imageLoad, setImageLoad] = useState<boolean>(false);

  const getThreeFilmsReviewData = async () => {
    const { data, error } = await supabase.from('movies').select('*').limit(3);

    if (!data && error) return;
    setThreeFilmsData(data);
  };

  // const getData = async () => {
  //   const { data, error } = await supabase
  //     .from('users')
  //     .select('id')
  //     .eq('id', currentUser?.id);

  //   setUserData(data?.length === 0);
  // };

  // const insertData = async () => {
  //   if (!currentUser?.id) return;
  //   await getData();

  //   if (userData) {
  //     const { error } = await supabase.from('users').insert({
  //       id: currentUser?.id,
  //       created_at: currentUser?.created_at,
  //       name: currentUser?.user_metadata.name,
  //       email: currentUser?.email,
  //       provider: currentUser?.app_metadata.provider,
  //       last_update: currentUser?.updated_at,
  //       liked_movies: [],
  //       last_comment: [],
  //       badge: 'User',
  //       date_to_next_generation: null,
  //       last_active: new Date(),
  //       image: null,
  //       brief: 'You can add brief in update profile page.',
  //       post_length: 0,
  //       comments_length: 0,
  //     });
  //   }
  // };

  useEffect(() => {
    // insertData();
    getThreeFilmsReviewData();
  }, []);

  const slides = threeFilmsData?.map((slide: any, index: any) => {
    return (
      <SwiperSlide key={index}>
        <div className='h-screen'>
          <div
            className={`bg-filtr h-full w-full ${
              imageLoad ? 'block' : 'hidden'
            }`}
          ></div>
          <img
            src={slide.image}
            alt='background image'
            className={`h-full w-full object-cover ${
              imageLoad ? 'block' : 'hidden'
            }`}
            onLoad={() => setImageLoad(true)}
          />
        </div>

        <div className='max-w-xl w-full text-white absolute bottom-10 left-0 px-6 md:bottom-24 md:left-16 lg:bottom-48 lg:left-24 lg:px-0'>
          <h1 className='text-3xl lg:text-5xl font-bold 2xl:text-6xl'>
            {slide.name}
          </h1>
          <div className='max-w-xs text-xs flex items-center justify-between mt-5 font-semibold md:text-base lg:text-lg'>
            <div className='flex items-center'>
              <img src={star} alt='star icon' className='mr-2' />
              <p>{slide.rating} / 5</p>
            </div>
            <p className='flex items-center justify-center'>
              <i className='fa-solid fa-circle mr-3 text-xxxs text-main-yellow'></i>
              {slide.type}
            </p>
            <p className='flex items-center justify-center'>
              <i className='fa-solid fa-circle mr-3 text-xxxs text-main-yellow'></i>
              {slide.year}
            </p>
          </div>
          <div className='max-w-md mt-5 transition-all'>
            <p
              className='cursor-pointer'
              onClick={() => setExpandBrief((prev) => (prev = !prev))}
            >
              {expandBrief
                ? slide.brief
                : slide.brief.split(' ').slice(0, 20).join(' ') + '...'}
            </p>
          </div>
          <Link to={'/movie/' + slide.id}>
            <Button
              text='Review'
              icon={true}
              addClasses='my-5 lg:my-0 lg:mt-5'
            />
          </Link>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <div className='min-h-screen bg-main-dark relative'>
      <div className={`${imageLoad ? 'block' : 'hidden'}`}>
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

        <div className='flex justify-center gap-10 py-20 bg-main-dark px-6'>
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
      {!imageLoad && (
        <div className='absolute z-50 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Spinner isDark={true} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
