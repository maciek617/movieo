import Button from '../../components/Button';
import { countSingleWords } from '../../helpers/countWords';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../App';
import Spinner from '../../components/Spinner';
import Tooltip from '../../components/Tooltip';
import SupportClosedTicketScreen from './SupportClosedTicketScreen';

function SupportPageTicket() {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const [allMsg, setAllMsg] = useState<any>();
  const { id } = useParams();
  const [msg, setMsg] = useState<string>('');
  const [badge, setBadge] = useState<string>('');
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showEndScreen, setShowEndScreen] = useState<boolean>(false);

  const singleMsg = {
    userName: currentUser?.user_metadata.name,
    userId: currentUser?.id,
    date: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'),
    msg: msg,
    writerBadge: badge,
  };

  const getAllMsg = async () => {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id);

    if (!data && error) return;

    return setAllMsg(data);
  };

  useEffect(() => {
    getAllMsg();
  }, [id]);

  useEffect(() => {
    const getCurrentUserBadge = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('badge')
        .eq('id', currentUser?.id);

      if (!data && error) return;
      setBadge(data[0]?.badge);
    };
    getCurrentUserBadge();
  }, [currentUser]);

  const updateModResponse = async () => {
    const { data, error } = await supabase
      .from('reports')
      .update({ mod_response: true })
      .eq('id', id);
  };

  const addMsg = async () => {
    await getAllMsg();

    const { data, error } = await supabase
      .from('reports')
      .update({ responses: [...allMsg[0]?.responses, singleMsg] })
      .eq('id', id)
      .select();

    if (!data && error) return;
    setAllMsg(data);

    if (badge === 'Mod') {
      await updateModResponse();
    }

    setMsg('');
  };

  const updateCloseTicket = async () => {
    const { data, error } = await supabase
      .from('reports')
      .update({ is_closed: true })
      .eq('id', id);

    if (error) return;
    setShowTooltip(true);
    setShowEndScreen(true);
  };
  return (
    <div className='bg-main-dark min-h-screen'>
      <div className='container mx-auto px-4'>
        {allMsg?.[0].user_id === currentUser?.id || badge === 'Mod' ? (
          <>
            {showTooltip && (
              <Tooltip
                variant='green'
                text='Closed!'
                isShow={showTooltip}
                closeTooltip={setShowTooltip}
              />
            )}

            {showEndScreen || allMsg?.[0].is_closed ? (
              <SupportClosedTicketScreen />
            ) : null}

            <div className='flex justify-center'>
              <div className='pt-24 text-white'>
                <p className='mb-4'>Problem: {allMsg?.[0].problem}</p>
                {allMsg?.[0]?.responses.length > 0 ? (
                  allMsg[0]?.responses?.map((res: any) => {
                    return (
                      <div
                        className='flex items-start gap-5 my-5'
                        key={res.date}
                      >
                        <div className='flex flex-col justify-center items-center border-r-2 pr-5'>
                          <Link
                            to={'/profile/' + currentUser?.id}
                            target='_blank'
                          >
                            <div
                              className={`w-12 h-12 border rounded-full flex items-center justify-center ${
                                res.writerBadge === 'Mod'
                                  ? 'border border-green-400'
                                  : 'border border-main-yellow'
                              }`}
                            >
                              <p
                                className={`${
                                  res.writerBadge === 'Mod'
                                    ? 'text-green-400'
                                    : 'text-main-yellow'
                                }`}
                              >
                                {res.writerBadge === 'Mod' ? 'Mod' : 'You'}
                              </p>
                            </div>
                          </Link>
                        </div>
                        <div className='flex flex-col gap-2 max-w-2xl'>
                          <p className='text-gray-400'>{res.date}</p>
                          <p>{res.msg}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className='font-bold text-xl'>
                    Ohhh, snap mod did not answered your question. Wait a little
                    bit more, please!
                  </p>
                )}

                <div className='mt-32 flex gap-10 items-start flex-col lg:items-center'>
                  <textarea
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                    placeholder='Write here...'
                    className='border border-main-yellow bg-transparent h-20 w-full p-2'
                  />
                  <div className='flex gap-5 w-full justify-center'>
                    <Button text='Send' icon={true} fn={addMsg} />
                    <p>{countSingleWords(msg)} / 1000</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-white text-center py-10'>
              <p>
                {badge === 'User'
                  ? 'Did you get help and your problem was solved? Close the ticket.'
                  : 'Did you help enough?'}
              </p>
              <Button
                text='Close ticket'
                addClasses='mt-5'
                fn={updateCloseTicket}
              />
            </div>
          </>
        ) : (
          <div className='pt-32'>
            <Spinner isDark={true} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SupportPageTicket;
// Page ticket