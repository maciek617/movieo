import { Link } from 'react-router-dom';
import Button from './Button';

function Footer() {
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
          <p className='text-xl'>Social</p>
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
              className='h-10 px-4 py-2 text-black outline-0 border-0 mr-4 mb-4 xl:mb-0'
            />
            <Button text='Subscribe' icon={true} />
          </div>
        </div>
      </div>
      <div className='text-center text-gray-400'>
        <p>All rights reserved &copy; 2023 | Movieo</p>
      </div>
    </div>
  );
}

export default Footer;
