import Button from '../../components/Button';

interface LeftSideProfileProps {
  image: string;
  name: string;
  badge: string;
}

function LeftSideProfile({ ...props }: LeftSideProfileProps) {
  return (
    <div className='w-full max-w-xs'>
      <div className='relative max-w-xs w-full'>
        <img
          src={props.image}
          alt='profile picture'
          className='h-72 w-full object-cover rounded-md shadow border border-main-yellow'
        />
        <div className='absolute top-5 right-3 bg-main-yellow text-black px-4 py-2 rounded-lg shadow-lg'>
          {props.badge}
        </div>
      </div>
      <div className='mt-5'>
        <p className='uppercase font-semibold text-sm tracking-wider text-gray-400'>
          <i className='fa-solid fa-user'></i> username
        </p>
        <p className='text-2xl'>{props.name}</p>
      </div>
      <div className='mt-5'>
        <p className='uppercase font-semibold text-sm tracking-wider text-gray-400'>
          <i className='fa-solid fa-clock'></i> last active
        </p>
        <p className='text-2xl'>2 days ago</p>
      </div>
      <div className='mt-5 text-xl'>
        <p className='uppercase font-semibold text-sm tracking-wider text-gray-400'>
          <i className='fa-solid fa-share-nodes'></i> social media
        </p>
        <div className='flex gap-3 mt-1'>
          <i className='fa-brands fa-facebook cursor-pointer'></i>
          <i className='fa-brands fa-instagram cursor-pointer'></i>
          <i className='fa-brands fa-twitter cursor-pointer'></i>
          <i className='fa-brands fa-tiktok cursor-pointer'></i>
        </div>
      </div>
      <Button text='Edit profile' icon={true} addClasses='mt-5' />
      <Button text='Report user' addClasses='mt-5 block' />
    </div>
  );
}

export default LeftSideProfile;
