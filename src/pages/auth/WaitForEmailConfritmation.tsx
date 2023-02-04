import React from 'react';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function WaitForEmailConfritmation() {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (currentUser?.confirmed_at) {
  //     navigate('/home');
  //     return;
  //   }
  // }, [currentUser]);
  // //   We should test if this works properly

  // const checkIfUserIsConfirmed = () => {
  //   console.log('123');

  //   if (!currentUser.confirmed_at) {
  //     navigate('/wait-for-email');
  //     return;
  //   }
  //   navigate('/home');
  // };

  return (
    <div className='bg-main-dark h-screen text-white'>
      <div className='container mx-auto px-4'>
        <h1 className='text-center pt-10'>
          Check your mailbox and confirm email you provided in account creation
          panel. You won't be able to login if you don't confirm your email!
        </h1>
        <div className='mt-10 text-center'>
          <p className='text-2xl'>
            Movie<span className='text-main-yellow'>o</span>
          </p>
          <p className='mt-4'>If you confirmed email click here</p>
          <Button text='Go to main page' />
        </div>
      </div>
    </div>
  );
}

export default WaitForEmailConfritmation;
