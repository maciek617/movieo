import { useParams } from 'react-router-dom';
import { supabase } from '../../App';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import RightSideInfo from './RightSideInfo';
import LeftSideInfo from './LeftSideInfo';
import DownSideInfo from './DownSideInfo';
import { useSelector } from 'react-redux';

function SingleFilms() {
  const { id } = useParams();
  const [filmData, setFilmData] = useState<any>({});
  const currentUser = useSelector((state: any) => state.currentUser.value);

  useEffect(() => {
    const fetchData = async (filmId: string) => {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('id', filmId);

      console.log('fireeeed');

      if (data && !error) setFilmData(data[0]);
    };

    if (!id) return;
    return () => {
      fetchData(id);
    };
  }, [id]);

  return (
    <div className='pt-32 px-6 bg-main-dark min-h-screen'>
      {filmData.image ? (
        <div className='container mx-auto'>
          <div className='w-full h-96 flex justify-around gap-10 text-white'>
            <LeftSideInfo
              image={filmData?.image}
              type={filmData?.type}
              year={filmData?.year}
              time={filmData?.time}
            />
            <RightSideInfo
              name={filmData?.name}
              brief={filmData?.brief}
              actors={filmData?.actors}
              platform={filmData?.platform}
              user_id={filmData?.user_id}
              currentUserId={currentUser?.id}
              routeId={id}
              allUsersRates={filmData?.rates?.length}
              ratingScore={filmData?.rating?.toFixed(1)}
              user_can_vote={filmData?.user_can_vote}
              show_profile={filmData?.show_profile}
            />
          </div>
          <DownSideInfo
            desc={filmData?.description}
            showComments={filmData?.show_comments}
            showCreated={filmData?.show_created_date}
            createdDate={filmData?.created_at}
          />
        </div>
      ) : (
        <Spinner isDark={true} />
      )}
    </div>
  );
}

export default SingleFilms;
