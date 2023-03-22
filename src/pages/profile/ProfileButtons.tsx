import { Link } from 'react-router-dom';
import Button from '../../components/Button';

interface ProfileButtonsProps {
  currentUserId: string;
  routeId: string | undefined;
}
function ProfileButtons({ ...props }: ProfileButtonsProps) {
  return props.currentUserId === props.routeId ? (
    <Link to={'/profile/' + props.currentUserId + '/edit'}>
      <Button text='Edit profile' icon={true} addClasses='mt-5' />
    </Link>
  ) : (
    <Button text='Report user' addClasses='mt-5 block' />
  );
}

export default ProfileButtons;
