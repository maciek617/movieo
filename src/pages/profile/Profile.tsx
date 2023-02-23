import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../App';
import LeftSideProfile from './LeftSideProfile';
import RightSideProfile from './RightSideProfile';

function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id);

      if (error) return;
      if (data) {
        setUserData(data[0]);
      }
    };
    fetchUserData();
  }, [id]);

  return (
    <div className='pt-32 min-h-screen bg-main-dark text-white'>
      <div className='container mx-auto flex justify-center gap-10 items-start'>
        <LeftSideProfile
          name={userData?.name}
          image='https://images.pexels.com/photos/13043541/pexels-photo-13043541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          badge={userData?.badge}
        />
        <RightSideProfile
          brief='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil harum
          velit ut deleniti ullam beatae magnam laboriosam repudiandae accusamus
          iste rerum adipisci dolores culpa aliquid ad sit, non deserunt
          eligendi.'
          hobby={['Riding a bike', 'Swimming', 'Yoga']}
          posts={userData?.posts?.length}
          comments={userData?.comments?.length}
          comment='This is the latest comment'
        />
      </div>
    </div>
  );
}

export default Profile;
