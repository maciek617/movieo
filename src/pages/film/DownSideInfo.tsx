import FilmComments from './FilmComments';
import FilmDescription from './FilmDescription';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
interface DownSideInfoProps {
  desc: string;
}
function DownSideInfo({ ...props }: DownSideInfoProps) {
  const currentUser = useSelector((state: any) => state.currentUser.value);

  return (
    <>
      <FilmDescription desc={props.desc} />
      {currentUser?.id ? (
        <FilmComments />
      ) : (
        <div>
          <p className='text-red-400'>You have to be logged in to comment.</p>
          <Link to={'/login'} replace>
            <Button text={'Login'} icon={true} addClasses='mt-3' />
          </Link>
        </div>
      )}
    </>
  );
}

export default DownSideInfo;
