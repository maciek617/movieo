import { useEffect, useState } from 'react';
import { supabase } from '../../App';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
interface SupportTicketsProps {
  currentBox: string;
}

function SupportTickets({ ...props }: SupportTicketsProps) {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState<any>();

  useEffect(() => {
    const fetchTicketsData = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', currentUser?.id);

      if (!data && error) return;

      setTicketData(data.reverse());
    };

    fetchTicketsData();
  }, [props.currentBox]);

  const ticket = ticketData?.map((ticket: any) => {
    return (
      <tr
        key={ticket.id}
        onClick={() => {
          if (ticket.is_closed) return;
          navigate('/support/' + ticket.id);
        }}
        className={`cursor-pointer transition-all ${
          ticket.is_closed
            ? 'cursor-not-allowed bg-gray-900'
            : 'bg-transparent hover:bg-gray-600'
        }`}
      >
        <td className='py-4'># {ticket.id}</td>
        <td className='py-4'>{ticket.date}</td>
        <td className='py-4 mx-auto'>
          {ticket.mod_response ? (
            <i className='fa-solid fa-circle-check text-green-400'></i>
          ) : (
            <i className='fa-solid fa-circle-xmark text-red-400'></i>
          )}
        </td>
        <td>
          {ticket.is_closed ? (
            <i className='fa-solid fa-circle-check text-green-400'></i>
          ) : (
            <i className='fa-solid fa-circle-xmark text-red-400'></i>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className='mt-10 text-white'>
      {ticket ? (
        <>
          <table className='text-center max-w-7xl w-full mx-auto'>
            <tbody className='w-full relative'>
              <tr className='text-2xl'>
                <th>Id</th>
                <th>Date</th>
                <th>Response Status</th>
                <th>Closed</th>
              </tr>
              {ticket}
            </tbody>
          </table>
          {ticket.length === 0 && (
            <p className='text-center py-3 text-red-400'>
              No support tickets found.
            </p>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default SupportTickets;
