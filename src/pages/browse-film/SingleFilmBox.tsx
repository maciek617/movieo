import React from 'react';

interface SingleFilmBoxProps {
  image: any;
  filmTitle: string;
  filmType: string;
  streamingPlatform: string;
  rating: number;
}

function SingleFilmBox({ ...props }: SingleFilmBoxProps) {
  return (
    <div className='relative hover:cursor-pointer transition-all hover:scale-101'>
      <div className='bg-filtr-low w-full h-full'></div>
      <img
        src={props.image}
        alt='Film image cover'
        className='w-96 h-52 object-cover rounded-md shadow-lg'
      />
      <div className='absolute bottom-2 left-5 font-bold w-4/5'>
        <p className='text-2xl'>{props.filmTitle}</p>
        <p className='font-semibold'>
          {props.filmType} | {props.streamingPlatform}
        </p>
        <div className='flex justify-between items-center w-full'>
          <p className='py-1 font-normal'>{props.rating}/10</p>
          <i className='fa-solid fa-heart transition-all hover:scale-125'></i>
        </div>
      </div>
    </div>
  );
}

export default SingleFilmBox;
