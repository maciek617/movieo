import { Link } from 'react-router-dom';
import Button from '../../components/Button';

function SupportClosedTicketScreen() {
  return (
    <div className='fixed top-0 left-0 darken-bg w-full min-h-screen text-white z-50 flex items-center justify-center flex-col'>
      <p className='text-4xl text-center lg:text-5xl'>
        Ticket has been closed!
      </p>
      <div className='mt-5 flex gap-5'>
        <Link to={'/support'}>
          <Button text='Support' />
        </Link>
        <Link to={'/home'}>
          <Button text='Home' />
        </Link>
      </div>
    </div>
  );
}

export default SupportClosedTicketScreen;
