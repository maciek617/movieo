import { useState } from 'react';
import Spinner from '../../components/Spinner';
interface SingleFilmBoxProps {
  image: any;
  filmTitle: string;
  filmType: string;
  streamingPlatform: string;
  rating: number;
  user_can_vote: boolean;
  small?: boolean;
}

function SingleFilmBox({ ...props }: SingleFilmBoxProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className='relative border-2 border-main-yellow rounded-md hover:cursor-pointer transition-all hover:scale-101'>
      <div className='bg-filtr-low w-full h-full'></div>
      <img
        src={props.image}
        alt='Film image cover'
        className={`${
          props.small ? 'w-52 h-52' : 'w-80 h-96'
        } object-cover shadow-lg ${loaded ? 'block' : 'hidden'}`}
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div
          className={`${
            props.small ? 'w-52 h-52' : 'w-96 h-52'
          } object-cover shadow-lg pt-10`}
        >
          <Spinner />
        </div>
      )}
      <div className='absolute bottom-2 left-5 font-bold w-4/5'>
        <p className='text-2xl'>{props.filmTitle}</p>
        <p className='font-semibold'>
          {props.filmType} | {props.streamingPlatform}
        </p>
        {props.user_can_vote && (
          <div className='flex justify-between items-center w-full'>
            <p className='py-1 font-normal'>{props.rating} / 5</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleFilmBox;
