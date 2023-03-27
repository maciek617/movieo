import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';
import ReportImage from '../../assets/report-image.svg';
import ReportModal from './ReportModal';
import Tooltip from '../../components/Tooltip';
import Heading from '../../components/Heading';

function ReportPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  return (
    <div className='min-h-screen bg-report text-white pt-32'>
      <Heading
        title='Help improve Movieo. Thanks in advance!'
        description='By reporting a bug, we can improve our product to fit you more and grow
        awesome community with helpers.'
      />
      <div className='flex items-center justify-center gap-10 mt-14'>
        <div onClick={() => setShowModal(true)}>
          <Button text='Report' />
        </div>
        <Link to={'/home'}>
          <Button text='Back to home' icon={true} />
        </Link>
      </div>
      <div className='px-4'>
        <img
          src={ReportImage}
          alt='Report image'
          className='max-w-xl mx-auto'
        />
      </div>

      {showModal && (
        <ReportModal closeModal={setShowModal} showTooltip={setShowTooltip} />
      )}
      {showTooltip && (
        <Tooltip
          variant='green'
          text='Ticket created!'
          closeTooltip={setShowTooltip}
          isShow={showTooltip}
        />
      )}
    </div>
  );
}

export default ReportPage;
