import { useSelector } from 'react-redux';

function GreetText() {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  return currentUser?.id ? (
    <p className='animate-slide-left absolute z-40 top-40 left-6 text-white text-xl md:left-24 lg:top-52 md:text-2xl lg:text-4xl'>
      Hello, <span className='font-bold'>{currentUser.user_metadata.name}</span>
      <span className='block'>
        What will you <span className='text-main-yellow'>review</span> today?
      </span>
    </p>
  ) : null;
}

export default GreetText;
