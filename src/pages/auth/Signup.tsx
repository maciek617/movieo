import React from 'react';
import Button from '../../components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/currentUser';
import { registerUser } from '../../helpers/SignupUser';

function Signup() {
  const navigate = useNavigate();
  const disptach = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const signupUserWithPassword = (e: any) => {
    e.preventDefault();
    // TODO: Validation
    registerUser(email, password, name, disptach, updateUser, navigate);
  };

  //   Set state of each input fields
  const updateEmailFields = (e: any, fn?: any) => {
    fn(e.target.value);
  };

  return (
    <div className='container mx-auto px-6 mt-20'>
      <h1>Signup to Movieo Universe and start exploring!</h1>
      <form>
        <div className='flex flex-col'>
          <label htmlFor=''>Name</label>
          <input
            type='email'
            className='border-2 border-black'
            onChange={(e) => updateEmailFields(e, setName)}
            value={name}
          />
        </div>
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
        <div className='flex flex-col'>
          <label htmlFor=''>Confirm Password</label>
          <input
            type='password'
            className='border-2 border-black'
            onChange={(e) => updateEmailFields(e, setConfirmPassword)}
            value={confirmPassword}
          />
        </div>
        <Button text='Signup' icon={true} fn={signupUserWithPassword} />
      </form>
    </div>
  );
}

export default Signup;
