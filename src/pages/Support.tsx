import Heading from '../components/Heading';
import SupportBoxes from './support-page/SupportBoxes';
import SupportContactForm from './support-page/SupportContactForm';
import SupportTickets from './support-page/SupportTickets';
import { useSelector } from 'react-redux';

function Support() {
  const supportState = useSelector((state: any) => state.support.value);

  return (
    <div className='bg-main-dark min-h-screen px-4'>
      <div className='container mx-auto pt-32'>
        <Heading
          title='Contact with us using simple form'
          description='We will contact with you as soon as its possible.'
        />
        <SupportBoxes currentBox={supportState} />

        {supportState === 'contact' ? (
          <SupportContactForm />
        ) : (
          <SupportTickets currentBox={supportState} />
        )}
      </div>
    </div>
  );
}

export default Support;
