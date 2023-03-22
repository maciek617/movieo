import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../App';
import RightSideProfile from './RightSideProfile';
import Spinner from '../../components/Spinner';
import ProfileSocialMedia from './ProfileSocialMedia';
import ProfileBadge from './ProfileBadge';
import ProfileImage from './ProfileImage';
import ProfileSingleField from './ProfileSingleField';
import ProfileButtons from './ProfileButtons';
import moment from 'moment';

function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id);

      if (!data && error) return;
      setUserData(data[0]);
    };

    fetchUserData();
  }, [id]);

  return (
    <div className='pt-32 min-h-screen bg-main-dark text-white'>
      {userData ? (
        <div className='container mx-auto flex justify-center gap-52 items-start'>
          <div className='flex flex-col'>
            <div className='relative h-52 w-52'>
              <ProfileImage
                image={userData?.image}
                name={userData?.name}
                rounded={true}
              />
              <ProfileBadge badge={userData?.badge} />
            </div>

            <ProfileSingleField
              title='username'
              title_depth={userData?.name}
              bigFont={true}
            />

            <ProfileSingleField
              title='last active'
              title_depth={moment(userData?.last_active).fromNow()}
              bigFont={true}
            />

            <ProfileButtons currentUserId={userData?.id} routeId={id} />
            
            <ProfileSocialMedia
              facebook={userData?.facebook}
              instagram={userData?.instagram}
              twitter={userData?.twitter}
              tiktok={userData?.tiktok}
            />
          </div>
          <RightSideProfile
            brief={userData?.brief}
            hobby={userData?.hobbies}
            posts={userData?.post_length}
            comments={userData?.comments_length}
            comment={userData?.last_comment}
          />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Profile;
