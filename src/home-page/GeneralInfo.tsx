import Button from '../components/Button';
import { Link } from 'react-router-dom';
interface GeneralInfoProps {
  post: number;
  users: number;
}
function GeneralInfo({ ...props }: GeneralInfoProps) {
  return (
    <>
      <div className='flex items-center justify-center flex-col gap-10 py-10 md:flex-row lg:py-20'>
        <div className='bg-main-yellow w-52 h-52 flex flex-col items-center justify-center lg:w-72 lg:h-60 xl:w-80 2xl:w-96'>
          <p className='text-2xl font-bold lg:text-4xl'>Users</p>
          <p className='text-4xl font-normal py-2 lg:text-5xl'>
            <span className='text-3xl font-bold lg:text-5xl'>+</span>
            {props.users}
          </p>
        </div>
        <div className='bg-main-yellow w-52 h-52 flex flex-col items-center justify-center lg:w-72 lg:h-60 xl:w-80 2xl:w-96'>
          <p className='text-2xl font-bold lg:text-4xl'>Reviews</p>
          <p className='text-4xl font-normal py-2 lg:text-5xl'>
            <span className='text-3xl font-bold lg:text-5xl'>+</span>
            {props.post}
          </p>
        </div>
      </div>
      <div className='bg-main-dark flex items-center justify-center flex-col'>
        <h1 className='text-white text-2xl text-center lg:text-4xl'>
          What are you waiting for?
        </h1>{' '}
        <Link to={'/browse/most-popular/netflix/action'}>
          <Button text='Start exploring!' addClasses='my-5' />
        </Link>
      </div>
      ;
    </>
  );
}

export default GeneralInfo;
