import { Link } from 'react-router-dom';
import Button from '../../components/Button';

interface LinkButtonsProps {
  platform: string;
  user_id: string;
  currentUserId: string;
  show_profile: boolean;
  routeId: string | undefined;
}

function LinkButtons({ ...props }: LinkButtonsProps) {
  return (
    <div className='mt-5 flex flex-col gap-3 lg:flex-row'>
      <a
        href={`https://www.${props.platform.replaceAll(' ', '')}.com`}
        target='_blank'
      >
        <Button text={props.platform} icon={true} addClasses='mr-5' />
      </a>
      {props.show_profile && props.currentUserId !== props.user_id && (
        <Link to={'/profile/' + props.user_id}>
          <Button text={`Author's profile`} icon={true} />
        </Link>
      )}
      {props.currentUserId === props.user_id && (
        <Link to={'/movie/' + props.routeId + '/edit'}>
          <Button text='Edit' addClasses='ml-5' />
        </Link>
      )}
    </div>
  );
}
export default LinkButtons;
