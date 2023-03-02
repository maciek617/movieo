import { supabase } from '../../App';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import ProfileSocialMedia from './ProfileSocialMedia';
import ProfileSingleField from './ProfileSingleField';
import ProfileBadge from './ProfileBadge';
import ProfileImage from './ProfileImage';
import ProfileButtons from './ProfileButtons';
interface LeftSideProfileProps {
  image: string;
  name: string;
  badge: string;
}

function LeftSideProfile({ ...props }: LeftSideProfileProps) {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const { id } = useParams();
  const [lastActive, setLastActive] = useState<any>();

  useEffect(() => {
    const getLastActiveTime = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('last_active')
        .eq('id', id);

      if (!data && error) return;
      setLastActive(moment(data[0].last_active).fromNow());
    };

    getLastActiveTime();
  }, [id]);

  return (
    <div className='w-full max-w-xs'>
      <div className='relative max-w-xs w-full'>
        <ProfileImage image={props.image} name={props.name.charAt(0)} />
        <ProfileBadge badge={props.badge} />
      </div>
      <ProfileSingleField
        title='username'
        title_depth={props.name}
        bigFont={true}
      />
      <ProfileSingleField
        title='last active'
        title_depth={lastActive}
        bigFont={true}
      />
      <ProfileSocialMedia />
      <ProfileButtons currentUserId={currentUser?.id} routeId={id} />
    </div>
  );
}

export default LeftSideProfile;
