import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/currentUser';
import { useState } from 'react';
import { signInUser } from '../../helpers/SignInUser';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import IconToggle from '../../components/IconToggle';
import { validateEmail } from '../../helpers/emailValidation';
import Modal from '../../components/Modal';
import LoginBG from '../../assets/login-bg.jpg';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const signCurrentUserIn = async (e: any) => {
    e.preventDefault();
    setError('');

    if (!email && !password) {
      setError('All fields must be filled.');
      return;
    }

    if (!validateEmail(email)) {
      setError('It looks like invalid e-mail.');
      return;
    }

    signInUser(email, password, dispatch, updateUser, navigate, setError);
    document.cookie =
      'wasLoggedIn=true; expires=Tue, 14 Feb 2023 12:00:00 UTCl path=/';
  };

  //   Set state of each input fields
  const updateEmailFields = (e: any, fn?: any) => {
    fn(e.target.value);
  };

  return (
    <>
      <div className='bg-filtr h-screen pt-32 px-4 relative w-full'>
        <img
          src={LoginBG}
          alt='background photo'
          className='absolute -z-10 h-full w-full object-cover top-0 left-0'
        />
        <h1 className='text-white text-center text-3xl lg:text-5xl xl:text-6xl 2xl:text-8xl'>
          Login to Movie
          <span className='text-main-yellow font-semibold'>o</span> Universe and
          start exploring!
        </h1>
        <form className='pt-10 max-w-sm  container mx-auto lg:pt-20'>
          <div className='flex flex-col'>
            <label className='text-white'>Email</label>
            <input
              type='email'
              placeholder='Enter an e-mail'
              className='border-2 border-black text-black px-4 py-2 outline-none rounded-lg transition-all focus:border-main-yellow focus:border-4'
              onChange={(e) => updateEmailFields(e, setEmail)}
              value={email}
            />
          </div>
          <div className='flex flex-col relative'>
            <label className='text-white'>Password</label>
            <input
              type={!show ? 'password' : 'text'}
              placeholder='Enter a password'
              className='border-2 border-black text-black px-4 py-2 outline-none rounded-lg transition-all focus:border-main-yellow focus:border-4'
              onChange={(e) => updateEmailFields(e, setPassword)}
              value={password}
            />
            <IconToggle show={show} setShow={setShow} />
          </div>

          <Button
            text='Signup'
            icon={true}
            fn={signCurrentUserIn}
            addClasses='mt-5'
          />
          <div className='text-white text-sm cursor-pointer max-w-xs mt-5'>
            <p>
              I do not have an account.{' '}
              <Link to={'/signup'}>
                <span className='text-main-yellow hover:underline transition-all'>
                  Signup instead
                </span>
              </Link>
            </p>
            <p className='hover:text-main-yellow transition-all'>
              <span className='hover:text-main-yellow'>
                I need help with login.
              </span>
            </p>
          </div>
        </form>

        {error && <Modal text={error} fn={setError} />}
      </div>
      <div className='h-screen'></div>
    </>
  );
}

export default Login;
