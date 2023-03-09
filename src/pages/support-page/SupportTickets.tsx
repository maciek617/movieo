import { useEffect, useState } from 'react';
import { supabase } from '../../App';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';

interface SupportTicketsProps {
  currentBox: string;
}

function SupportTickets({ ...props }: SupportTicketsProps) {
  const currentUser = useSelector((state: any) => state.currentUser.value);

  const [ticketData, setTicketData] = useState<any>();

  useEffect(() => {
    const fetchTicketsData = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', currentUser?.id);

      if (!data && error) return;
      console.log(data);

      setTicketData(data);
    };

    fetchTicketsData();
  }, [props.currentBox]);

  const ticket = ticketData?.map((ticket: any) => {
    return (
      <tr
        key={ticket.id}
        className='hover:bg-gray-600 cursor-pointer transition-all    '
      >
        <td className='py-4'># {ticket.id}</td>
        <td className='py-4'>{ticket.date}</td>
        <td className='py-4 mx-auto'>
          <span
            className={`inline-block w-3 h-3 bg-${
              ticket.mod_response ? 'green' : 'red'
            }-500 rounded-full`}
          ></span>
        </td>
      </tr>
    );
  });
  return (
    <div className='mt-10 text-white'>
      {ticket ? (
        <table className='text-center max-w-7xl w-full mx-auto'>
          <tbody className='w-full relative'>
            <tr className='text-2xl'>
              <th>Id</th>
              <th>Date</th>
              <th>Response Status</th>
            </tr>
            {ticket}
          </tbody>
        </table>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default SupportTickets;
