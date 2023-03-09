import SupportBoxes from './support-page/SupportBoxes';
import SupportContactForm from './support-page/SupportContactForm';
import SupportText from './support-page/SupportText';
import SupportTickets from './support-page/SupportTickets';
import { useSelector } from 'react-redux';

function Support() {
  const supportState = useSelector((state: any) => state.support.value);

  return (
    <div className='bg-main-dark min-h-screen'>
      <div className='container mx-auto pt-32'>
        <SupportText />
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
