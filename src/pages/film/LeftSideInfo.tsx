import { useState } from 'react';
import Spinner from '../../components/Spinner';
interface LeftSideInfoProps {
  image: string;
  type: string;
  year: string;
  time: string;
}
function LeftSideInfo({ ...props }: LeftSideInfoProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className='w-full relative'>
      <img
        src={props.image}
        alt='cover image'
        className={`max-w-3xl w-full h-full object-cover rounded-md ${
          loaded ? 'block' : 'hidden'
        }`}
        onLoad={() => {
          setLoaded(true);
        }}
      />
      {!loaded && (
        <div className='pt-20'>
          <Spinner />
        </div>
      )}
      <div className='bg-main-yellow absolute top-3 right-3 rounded-lg shadow'>
        <p className='py-2 px-6 text-main-dark'>{props.type}</p>
      </div>
      <div className='bg-main-dark text-white absolute top-3 left-3 rounded-lg shadow-xl'>
        <p className='py-2 px-6 font-bold text-sm'>{props.year}</p>
      </div>
      <div className='bg-red-400 text-white absolute bottom-3 left-3 rounded-lg shadow-xl'>
        <p className='py-2 px-6 font-bold text-sm'>
          {Math.floor(+props.time / 60)}h {Math.floor(+props.time % 60)}min
        </p>
      </div>
    </div>
  );
}
export default LeftSideInfo;
