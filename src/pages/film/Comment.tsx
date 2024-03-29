import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../App';
interface CommentProps {
  name: string;
  userId: string;
  what: string;
  when: string;
  userImage: string;
  deleteComment: any;
  currentUserId: string;
  creatorId: string;
}
function Comment({ ...props }: CommentProps) {
  const [badge, setBadge] = useState<string>('');
  useEffect(() => {
    const fetchUserBadge = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('badge')
        .eq('id', props.userId);

      if (!data || error) return;
      setBadge(data[0]?.badge);
    };

    fetchUserBadge();
  }, []);

  return (
    <div className='flex py-5'>
      <Link to={'/profile/' + props.userId}>
        {props.userImage ? (
          <img
            src={props.userImage}
            alt='Profile picture'
            className='w-10 h-10 rounded-full object-cover'
          />
        ) : (
          <div className='w-10 h-10 rounded-full flex items-center justify-center border border-main-yellow text-white'>
            {props.name.charAt(0)}
          </div>
        )}
      </Link>
      <div className='w-4/5 ml-5'>
        <div className='flex items-center justify-between'>
          <Link to={'/profile/' + props.userId}>
            <p className='text-white text-sm font-semibold'>
              {props.name}{' '}
              <span className='tracking-wider text-gray-500 text-sm font-thin ml-2 lg:ml-5'>
                {props.when}
              </span>
              {props.userId === props.creatorId && (
                <span className='text-main-yellow block lg:ml-5 lg:inline-block'>
                  <i className='fa-solid fa-check'></i> Author
                </span>
              )}
              {badge === 'Mod' && (
                <span className='text-green-400 block lg:ml-5 md:inline-block'>
                  <i className='fa-solid fa-check'></i> Mod
                </span>
              )}
            </p>
          </Link>
          {props.currentUserId === props.userId && (
            <p
              onClick={() => props.deleteComment()}
              className='text-white cursor-pointer'
            >
              <i className='fa-solid fa-xmark'></i>
            </p>
          )}
        </div>
        <p className='text-white mt-2'>{props.what}</p>
      </div>
    </div>
  );
}

export default Comment;
