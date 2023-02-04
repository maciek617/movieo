import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/currentUser';
import { useState } from 'react';
import { signInUser } from '../../helpers/SignInUser';
import Button from '../../components/Button';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const signCurrentUserIn = (e: any) => {
    e.preventDefault();
    signInUser(email, password, dispatch, updateUser, navigate);
    document.cookie =
      'wasLoggedIn=true; expires=Tue, 14 Feb 2023 12:00:00 UTCl path=/';
  };

  //   Set state of each input fields
  const updateEmailFields = (e: any, fn?: any) => {
    fn(e.target.value);
  };

  return (
    <div>
      <form className='mt-20'>
        <div className='flex flex-col'>
          <label htmlFor=''>Email</label>
          <input
            type='email'
            className='border-2 border-black'
            onChange={(e) => updateEmailFields(e, setEmail)}
            value={email}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor=''>Password</label>
          <input
            type='password'
            className='border-2 border-black'
            onChange={(e) => updateEmailFields(e, setPassword)}
            value={password}
          />
        </div>
        <Button text='Signup' icon={true} fn={signCurrentUserIn} />
      </form>
    </div>
  );
}

export default Login;
