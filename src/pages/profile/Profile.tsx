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
import { useSelector } from 'react-redux';
import ProfileQuote from './ProfileQuote';
import ProfileActive from './ProfileActive';

function Profile() {
  const { id } = useParams();
  const currentUser = useSelector((state: any) => state.currentUser.value);
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
    <div className='pt-24 min-h-screen bg-main-dark text-white px-6'>
      {userData ? (
        <div className='container mx-auto flex justify-center lg:justify-start items-start flex-col lg:gap-10 lg:flex-row'>
          <div className='flex flex-col'>
            <div className='relative h-52 w-52 lg:w-60 lg:h-60'>
              <ProfileImage
                image={userData?.image}
                name={userData?.name}
                rounded={true}
              />
              <ProfileBadge badge={userData?.badge} />
              <ProfileActive isActive={userData?.isActive}/>
            </div>

            <ProfileSingleField
              title='username'
              title_depth={userData?.name}
              bigFont={true}
            />

            <ProfileSingleField
              title='last login'
              title_depth={moment(userData?.last_active).fromNow()}
              bigFont={true}
            />

            <ProfileButtons currentUserId={currentUser?.id} routeId={id} />

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
          <div className='mt-5 flex flex-col gap-5'>
            <ProfileQuote
              title='Quote of the person.'
              desc='The greatest glory in living lies not in never falling, but in rising every time we fall.'
              showQoutes={true}
            />

            <ProfileQuote
              title='Additional titles.'
              desc='Review Champion, Addicted movie researcher'
              showQoutes={false}
            />

            <ProfileQuote
              title='Recommendations.'
              desc='Scream VI, The Rain, Outer Banks.'
              showQoutes={false}
            />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Profile;
