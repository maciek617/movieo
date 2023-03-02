import Button from '../../components/Button';

interface ProfileButtonsProps {
  currentUserId: string;
  routeId: string | undefined;
}
function ProfileButtons({ ...props }: ProfileButtonsProps) {
  return props.currentUserId === props.routeId ? (
    <Button text='Edit profile' icon={true} addClasses='mt-5' />
  ) : (
    <Button text='Report user' addClasses='mt-5 block' />
  );
}

export default ProfileButtons;
