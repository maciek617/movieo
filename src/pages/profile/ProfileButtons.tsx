import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { useState } from 'react';
import Tooltip from '../../components/Tooltip';
interface ProfileButtonsProps {
  currentUserId: string;
  routeId: string | undefined;
}
function ProfileButtons({ ...props }: ProfileButtonsProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return props.currentUserId === props.routeId ? (
    <Link to={'/profile/' + props.currentUserId + '/edit'}>
      <Button text='Edit profile' icon={true} addClasses='mt-5' />
    </Link>
  ) : (
    <>
      <Button
        text='Report user'
        addClasses='mt-5 block'
        fn={() => setShowTooltip(true)}
      />
      {showTooltip && (
        <Tooltip
          variant='green'
          text='Report sent!'
          closeTooltip={setShowTooltip}
          isShow={showTooltip}
        />
      )}
    </>
  );
}

export default ProfileButtons;
