import { supabase } from '../App';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useState } from 'react';
import { validateEmail } from '../helpers/emailValidation';
import Modal from './Modal';
import Tooltip from './Tooltip';
function Footer() {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [greetText, setGreetText] = useState<string>('');
  const mainLinks = ['Home', 'Coming soon', 'What to watch?', 'Blog', 'About'];
  const policyLinks = [
    'Terms and Conditions',
    'Cookies Policy',
    'Privacy Policy',
  ];
  const spaceLinks = ['I own a movie', 'Support'];

  const getSingleLink = (links: Array<string>) => {
    return links.map((link) => {
      return (
        <Link
          to={`${link.toLocaleLowerCase().replaceAll(' ', '-')}`}
          key={link}
          className='hover:text-main-yellow'
        >
          {link}
        </Link>
      );
    });
  };

  const addEmailToNewsletter = async () => {
    setGreetText('');
    if (!email) {
      setEmailError('You cannot leave this empty!');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('It looks like a NOT valid e-mail. Try again!');
      return;
    }

    const { error } = await supabase
      .from('newsletter')
      .insert({ email: email });

    if (error) {
      setEmailError(
        error.code === '23505'
          ? 'This e-mail is in our newsletter'
          : error.message
      );
    } else {
      setEmailError('');
      setEmail('');
      setGreetText(
        'Your e-mail has been added to our newsletter! We wont spam. Do not worry about it!'
      );
    }
  };

  return (
    <div className='bg-main-dark py-5 px-6'>
      <div className='container mx-auto text-white flex justify-center gap-10 flex-col lg:flex-row lg:gap-14 xl:gap-20'>
        <div>
          <p className='text-xl'>Main Links</p>
          <div className='flex flex-col my-3 gap-2 text-gray-400'>
            {getSingleLink(mainLinks)}
          </div>
        </div>
        <div>
          <p className='text-xl'>Policy</p>
          <div className='flex flex-col my-3 gap-2 text-gray-400'>
            {getSingleLink(policyLinks)}
          </div>
        </div>
        <div>
          <p className='text-xl'>Your space</p>
          <div className='flex flex-col my-3 gap-2 text-gray-400'>
            {getSingleLink(spaceLinks)}
          </div>
        </div>
        <div>
          <p className='text-xl'>Social media</p>
          <div className='flex gap-3 text-xl my-3'>
            <i className='fa-brands fa-instagram cursor-pointer hover:text-main-yellow'></i>
            <i className='fa-brands fa-facebook cursor-pointer hover:text-main-yellow'></i>
            <i className='fa-brands fa-tiktok cursor-pointer hover:text-main-yellow'></i>
          </div>
        </div>
        <div>
          <p className='text-xl'>Newsletter</p>
          <div className='my-3'>
            <input
              type='text'
              placeholder='Enter your e-mail...'
              className={`h-10 px-4 py-2 text-black outline-0 border-0 mr-4 mb-4 ${
                emailError ? 'border-4 border-red-400' : null
              }   xl:mb-0`}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            {emailError && (
              <Tooltip
                variant='red'
                text='Something wrong!'
                isShow={emailError ? true : false}
                closeTooltip={setEmailError}
              />
            )}
            <Button text='Subscribe' icon={true} fn={addEmailToNewsletter} />
          </div>
        </div>
      </div>
      <div className='text-center text-gray-400'>
        <p>All rights reserved &copy; 2023 | Movieo</p>
      </div>

      {greetText && (
        <Tooltip
          variant='green'
          text='Email added!'
          isShow={greetText ? true : false}
          closeTooltip={setGreetText}
        />
      )}
    </div>
  );
}

export default Footer;
