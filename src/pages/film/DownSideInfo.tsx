import FilmComments from './FilmComments';
import FilmDescription from './FilmDescription';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
interface DownSideInfoProps {
  desc: string;
  showComments: boolean;
}
function DownSideInfo({ ...props }: DownSideInfoProps) {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  console.log(currentUser?.user_metadata?.name);

  return (
    <>
      <FilmDescription desc={props.desc} />
      {props.showComments && currentUser?.id ? (
        <FilmComments
          userId={currentUser?.id}
          userImage={currentUser?.image ? currentUser?.image : ''}
          userName={currentUser?.user_metadata?.name}
        />
      ) : (
        <div>
          <p className='text-red-400'>
            {currentUser?.id
              ? 'User do not allow to comment this review.'
              : 'You have to be logged in to comment.'}
          </p>
          {!currentUser?.id && (
            <Link to={'/login'} replace>
              <Button text={'Login'} icon={true} addClasses='mt-3' />
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default DownSideInfo;
