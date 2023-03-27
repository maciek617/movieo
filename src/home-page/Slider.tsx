import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay, Lazy } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/lazy';
import star from '../assets/star.svg';

import Button from '../components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
interface SliderProps {
  threeFilms: any;
  imageLoad: boolean;
  setImageLoad: any;
}
function Slider({ ...props }: SliderProps) {
  const [expandBrief, setExpandBrief] = useState<boolean>(false);
  const slides = props.threeFilms?.map((slide: any, index: number) => {
    return (
      <SwiperSlide key={index}>
        <div className='h-screen'>
          <div
            className={`bg-filtr h-full w-full ${
              props.imageLoad ? 'block' : 'hidden'
            }`}
          ></div>
          <img
            src={slide.image}
            alt='background image'
            className={`h-full w-full object-cover ${
              props.imageLoad ? 'block' : 'hidden'
            }`}
            onLoad={() => props.setImageLoad(true)}
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
              className='cursor-pointer text-sm lg:text-md xl:text-base'
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
    <div className='h-screen relative'>
      <Swiper
        modules={[EffectFade, Pagination, Autoplay, Lazy]}
        spaceBetween={0}
        effect={'fade'}
        slidesPerView={1}
        allowTouchMove={false}
        lazy={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={500}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
      >
        {slides}
      </Swiper>
    </div>
  );
}

export default Slider;
