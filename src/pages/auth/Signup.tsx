import Button from '../../components/Button';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/currentUser';
import { registerUser } from '../../helpers/SignupUser';
import bgSignupCover from '../../assets/signup-bg.jpg';
import IconToggle from '../../components/IconToggle';
import Modal from '../../components/Modal';
import { validateEmail } from '../../helpers/emailValidation';
function Signup() {
  const navigate = useNavigate();
  const disptach = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  const signupUserWithPassword = (e: any) => {
    e.preventDefault();
    // TODO: Validation
    // Check if all fields are filled
    // Setting errors
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields must be filled');
      return;
    }

    if (name.length < 3) {
      setError('Name should be at least 3 char.');
      return;
    }

    if (!validateEmail(email)) {
      setError('It do not look like a valid email.');
      return;
    }

    if (passwordRegex.test(password)) {
      setError(
        'Password should be at least 8 characters, contains at least 1 digit, 1 special char and 1 uppercase.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Password should be the same.');
      return;
    }

    setError('');
    registerUser(email, password, name, disptach, updateUser, navigate);
  };

  //   Set state of each input fields
  const updateEmailFields = (e: any, fn?: any) => {
    fn(e.target.value);
  };

  return (
    <>
      <div className='bg-filtr w-full h-screen relative'>
        <img
          src={bgSignupCover}
          alt='signup background'
          className='absolute -z-10 h-full w-full object-cover'
        />
        <div className='container mx-auto pt-20 px-6 mt-5 text-white lg:mt-8 xl:mt-10 2xl:mt-12'>
          <h1 className='text-center text-3xl lg:text-5xl xl:text-6xl 2xl:text-8xl'>
            Signup to Movie
            <span className='text-main-yellow font-semibold'>o</span> Universe
            and start exploring!
          </h1>
          <form className='mt-7'>
            <div className='flex flex-col my-3 max-w-sm'>
              <label>Name</label>
              <input
                type='text'
                className='border-2 border-black text-black px-4 py-2 outline-none rounded-lg transition-all focus:border-main-yellow focus:border-4'
                onChange={(e) => updateEmailFields(e, setName)}
                value={name}
                placeholder='Enter a name'
              />
            </div>
            <div className='flex flex-col my-3 max-w-sm'>
              <label>Email</label>
              <input
                type='email'
                className='border-2 border-black text-black px-4 py-2 outline-none rounded-lg transition-all focus:border-main-yellow focus:border-4'
                onChange={(e) => updateEmailFields(e, setEmail)}
                value={email}
                placeholder='Enter an e-mail'
              />
            </div>
            <div className='flex flex-col my-3 max-w-sm relative'>
              <label>Password</label>
              <input
                type={!show ? 'password' : 'text'}
                className='border-2 border-black text-black px-4 py-2 outline-none rounded-lg transition-all focus:border-main-yellow focus:border-4'
                onChange={(e) => updateEmailFields(e, setPassword)}
                value={password}
                placeholder='Enter a password'
              />
              <IconToggle show={show} setShow={setShow} />
            </div>
            <div className='flex flex-col my-3 max-w-sm'>
              <label>Confirm Password</label>
              <input
                type='password'
                className='border-2 border-black text-black px-4 py-2 outline-none rounded-lg transition-all focus:border-main-yellow focus:border-4'
                onChange={(e) => updateEmailFields(e, setConfirmPassword)}
                value={confirmPassword}
                placeholder='Confirm password'
              />
            </div>
            {error && (
              <div>
                <p className='text-red-400 font-semibold py-2 text-xl'>
                  {error}
                </p>
              </div>
            )}
            <div className='text-sm cursor-pointer max-w-xs'>
              <p>
                I already have an account.{' '}
                <Link to={'/login'}>
                  <span className='text-main-yellow hover:underline transition-all'>
                    Login instead
                  </span>
                </Link>
              </p>
              <p className='hover:text-main-yellow transition-all'>
                <span className='hover:text-main-yellow'>
                  I need help with account creation.
                </span>
              </p>
            </div>
            <Button
              text='Create account'
              icon={true}
              fn={signupUserWithPassword}
              addClasses='mt-5'
            />
          </form>
        </div>
        {error && <Modal text={error} fn={setError} error={true} />}
      </div>
      <div className='h-screen'></div>
    </>
  );
}

export default Signup;
