import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import IntroImg from '../assets/intro-bg.jpg';
import CookiesInfo from '../components/CookiesInfo';

function IntroPage() {
  const navigate = useNavigate();

  const navigateToProperTab = () => {
    document.cookie.includes('wasLoggedIn')
      ? navigate('/login')
      : navigate('/signup');
  };

  return (
    <>
      <div className='bg-filtr h-screen w-full text-white text-center'>
        <img
          src={IntroImg}
          alt='Background image'
          className='h-full w-full absolute -z-10 object-cover'
        />
        <div className='mt-80'>
          <p className='text-6xl md:text-8xl font-semibold'>
            Movie<span className='text-main-yellow'>o</span>
          </p>
          <p>Join to the best community of reviewers!</p>
          <Button text='Join in!' addClasses='mt-10' fn={navigateToProperTab} />
        </div>
        <CookiesInfo />
      </div>
      <div className='h-screen'></div>
    </>
  );
}

export default IntroPage;
