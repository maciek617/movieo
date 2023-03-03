import { Link } from 'react-router-dom';

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
  return (
    <div className='flex py-5'>
      <Link to={'/profile/' + props.userId}>
        {props.userImage ? (
          <img src={props.userImage} alt='Profile picture' />
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
              <span className='tracking-wider text-gray-500 text-sm font-thin ml-5'>
                {props.when}
              </span>
              {props.userId === props.creatorId && (
                <span className='ml-5 text-main-yellow'>
                  <i className='fa-solid fa-check'></i> Author
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
