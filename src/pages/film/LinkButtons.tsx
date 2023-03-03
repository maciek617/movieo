import { Link } from 'react-router-dom';
import Button from '../../components/Button';

interface LinkButtonsProps {
  platform: string;
  user_id: string;
  currentUserId: string;
  show_profile: boolean;
}
function LinkButtons({ ...props }: LinkButtonsProps) {
  return (
    <div className='mt-10'>
      <a
        href={`https://www.${props.platform.replaceAll(' ', '')}.com`}
        target='_blank'
      >
        <Button text={props.platform} icon={true} addClasses='mr-5' />
      </a>
      {props.show_profile && (
        <Link to={'/profile/' + props.user_id}>
          <Button text={`Author's profile`} icon={true} />
        </Link>
      )}
      {props.currentUserId === props.user_id && (
        <Link to={'/home'}>
          <Button text='Edit' addClasses='ml-5' />
        </Link>
      )}
    </div>
  );
}
export default LinkButtons;
