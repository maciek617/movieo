import Button from '../../components/Button';
import ReportImage from '../../assets/report-image.svg';
import { Link } from 'react-router-dom';
import ReportModal from './ReportModal';
import { useState } from 'react';
import Tooltip from '../../components/Tooltip';
function ReportPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  return (
    <div className='min-h-screen bg-report text-white pt-32'>
      <h1 className='text-center text-6xl font-bold max-w-5xl mx-auto'>
        Help improve Movieo, see bug? Report! Thanks in advance!
      </h1>
      <p className='text-center max-w-2xl mx-auto py-2'>
        By reporting a bug, we can improve our product to fit you more and grow
        awesome community with helpers.
      </p>
      <div className='flex items-center justify-center gap-10 mt-14'>
        <div onClick={() => setShowModal(true)}>
          <Button text='Report' />
        </div>
        <Link to={'/home'}>
          <Button text='Back to home' icon={true} />
        </Link>
      </div>
      <div>
        <img
          src={ReportImage}
          alt='Report image'
          className='max-w-xl mx-auto'
        />
      </div>

      {showModal && <ReportModal closeModal={setShowModal} showTooltip={setShowTooltip}/>}
      {showTooltip && <Tooltip variant='green' text='Ticket created!' closeTooltip={setShowTooltip} isShow={showTooltip} />}
    </div>
  );
}

export default ReportPage;
