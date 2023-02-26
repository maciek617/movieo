import { useSelector } from 'react-redux';
interface CommentProps {
  name: string;
  userId: string;
  what: string;
  when: string;
  userImage: any;
  deleteComment: any;
}
function Comment({ ...props }: CommentProps) {
  const currentUser = useSelector((state: any) => state.currentUser.value);

  return (
    <div className='flex py-5'>
      {props.userImage ? (
        <img src={props.userImage} alt='Profile picture' />
      ) : (
        <div className='w-10 h-10 rounded-full flex items-center justify-center border border-main-yellow text-white'>
          {props.name.charAt(0)}
        </div>
      )}
      <div className='w-4/5 ml-5'>
        <div className='flex items-center justify-between'>
          <p className='text-white text-sm font-semibold'>
            {props.name}{' '}
            <span className='tracking-wider text-gray-500 text-sm font-thin ml-5'>
              {props.when}
            </span>
          </p>
          {currentUser?.id === props.userId && (
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
