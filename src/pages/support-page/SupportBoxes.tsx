import { useDispatch } from 'react-redux';
import { updateDisplayState } from '../../features/support';
import { Link } from 'react-router-dom';

interface SupportBoxesProps {
  currentBox: string;
}

function SupportBoxes({ ...props }: SupportBoxesProps) {
  const dispatch = useDispatch();
  const updateDisplayBox = (title: string) =>
    dispatch(updateDisplayState(title));

  return (
    <div className='flex items-center justify-center gap-10 mt-20'>
      <div
        onClick={() => updateDisplayBox('contact')}
        className={`${
          props.currentBox === 'contact' ? 'bg-main-yellow' : 'bg-white'
        } text-black px-6 py-3 rounded-lg cursor-pointer hover:bg-main-yellow transition-all font-semibold`}
      >
        Contact
      </div>
      <Link to={'/report'}>
        <div className='bg-white text-black px-6 py-3 rounded-lg cursor-pointer hover:bg-main-yellow transition-all font-semibold'>
          Report a problem
        </div>
      </Link>
      <div
        onClick={() => updateDisplayBox('ticket')}
        className={`${
          props.currentBox === 'ticket' ? 'bg-main-yellow' : 'bg-white'
        } text-black px-6 py-3 rounded-lg cursor-pointer hover:bg-main-yellow transition-all font-semibold`}
      >
        Your tickets
      </div>
    </div>
  );
}

export default SupportBoxes;
