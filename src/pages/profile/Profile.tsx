import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../App';
import LeftSideProfile from './LeftSideProfile';
import RightSideProfile from './RightSideProfile';
import Spinner from '../../components/Spinner';

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
        <div className='container mx-auto flex justify-center gap-10 items-start'>
          <LeftSideProfile
            name={userData?.name}
            image={userData?.image}
            badge={userData?.badge}
          />
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
