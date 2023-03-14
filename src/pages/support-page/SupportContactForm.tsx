import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { validateEmail } from '../../helpers/emailValidation';
import { useState } from 'react';
import { supabase } from '../../App';
import { countSingleWords } from '../../helpers/countWords';
import moment from 'moment';
import Tooltip from '../../components/Tooltip';

function SupportContactForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [error, setError] = useState('');

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !message) {
      setError('All fields should be filled.');
      return;
    }

    if (!validateEmail(email)) {
      setError('It looks like invalid e-mail.');
      return;
    }

    if (countSingleWords(message) > 500) {
       setError('Message cannot have more than 500 words.');
       return;
     }

    const { error } = await supabase.from('contact').insert({
      id: Math.floor(Math.random() * 10000),
      name: name,
      email: email,
      message: message,
      date: moment(new Date()).format('L'),
    });

    if (error) return;
    setShowTooltip(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          sendMessage(e);
        }}
        className='text-white mt-10'
      >
        <div className='flex flex-col items-center justify-center max-w-sm w-full mx-auto gap-5'>
          <div className='flex flex-col w-full'>
            <label>Name</label>
            <input
              type='text'
              placeholder='John...'
              className='text-black px-4 py-2 w-full'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className='flex flex-col w-full'>
            <label>Email</label>
            <input
              type='email'
              placeholder='John...'
              className='text-black px-4 py-2 w-full'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className='flex flex-col w-full'>
            <label>Message</label>
            <textarea
              placeholder='John...'
              className='text-black px-4 py-2 w-full'
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <p className='mt-1'>{countSingleWords(message)} / 500</p>
          </div>
          <Button text='Send' icon={true} />
        </div>
      </form>

      {error && <Modal text={error} fn={setError} />}
      
      {showTooltip && (
        <Tooltip
          text='Message Sent!'
          variant='green'
          isShow={showTooltip}
          closeTooltip={setShowTooltip}
        />
      )}
    </div>
  );
}

export default SupportContactForm;
