import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import { supabase } from '../../App';
import { useSelector } from 'react-redux';
import moment from 'moment';
interface ReportModalProps {
  closeModal: any;
  showTooltip: any;
}

function ReportModal({ ...props }: ReportModalProps) {
  const [categoryProblem, setCategoryProblem] = useState<string>(
    'problem with signing'
  );
  const [problem, setProblem] = useState<string>('');
  const closeModal = () => props.closeModal(false);
  const currentUser = useSelector((state: any) => state.currentUser.value);

  useEffect(() => {
    window.addEventListener('click', (e: any) => {
      e.target.classList.contains('darken-bg') ? props.closeModal(false) : null;
    });

    window.addEventListener('keyup', (e: any) => {
      e.key === 'Escape' ? props.closeModal(false) : null;
    });

    return () => {
      window.removeEventListener('click', (e: any) => {
        e.target.classList.contains('darken-bg')
          ? props.closeModal(false)
          : null;
      });

      window.removeEventListener('keyup', (e: any) => {
        e.key === 'Escape' ? props.closeModal(false) : null;
      });
    };
  }, []);

  const createATicket = async () => {
    if (!problem.length) return;
    if (problem.length > 500) return;

    await supabase.from('reports').insert({
      id: Math.floor(Math.random() * 100000),
      type: categoryProblem,
      problem: problem,
      user_id: currentUser?.id,
      date: moment(new Date()).format('L'),
    });

    props.closeModal(false);
    props.showTooltip(true);
  };

  return (
    <div className='w-full h-screen fixed top-0 left-0 darken-bg flex items-center justify-center'>
      <div className='bg-white text-black p-4 rounded-md'>
        <p className='text-2xl pt-2'>Select a category</p>
        <select onChange={(e: any) => setCategoryProblem(e.target.value)}>
          <option value='problem with movie'>
            Problem with movie (add, edit, remove)
          </option>
          <option value='problem with what-to-watch page'>
            Problem with what to watch page
          </option>
          <option value='problem with account'>Problem with account</option>
          <option value='other'>Other</option>
        </select>
        <div className='flex flex-col mt-5'>
          <label className='text-2xl pt-2'>Describe your problem</label>
          <textarea
            placeholder='Write here...'
            className='my-2 border rounded-sm p-2'
            onChange={(e) => setProblem(e.target.value)}
            value={problem}
          ></textarea>
          <div className='flex justify-between items-center'>
            <Button text='Cancel' fn={closeModal} />
            <Button text='Send' icon={true} fn={createATicket} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportModal;
