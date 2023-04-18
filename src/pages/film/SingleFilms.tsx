import { useParams } from 'react-router-dom';
import { supabase } from '../../App';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';
import RightSideInfo from './RightSideInfo';
import LeftSideInfo from './LeftSideInfo';
import DownSideInfo from './DownSideInfo';

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
      if (data && !error) setFilmData(data[0]);
    };

    if (!id) return;
    fetchData(id);
  }, [id]);

  useEffect(() => {
    const updateViews = async () => {
      await supabase
        .from('movies')
        .update({ views: filmData.views + 1 })
        .eq('id', id);
    };

    if (filmData.views >= 0) {
      updateViews();
      console.log('fired');
      
    }
  }, [filmData.views]);

  return (
    <div className='pt-32 px-6 bg-main-dark min-h-screen'>
      {filmData?.image ? (
        <div className='container mx-auto min-h-screen'>
          <div className='w-full flex flex-col justify-around gap-10 text-white lg:flex-row'>
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
          <div>
            <DownSideInfo
              desc={filmData?.description}
              showComments={filmData?.show_comments}
              showCreated={filmData?.show_created_date}
              createdDate={filmData?.created_at}
              creatorId={filmData?.user_id}
              filmType={filmData?.type}
              id={id}
              views={filmData?.views}
            />
          </div>
        </div>
      ) : (
        <Spinner isDark={true} />
      )}
    </div>
  );
}

export default SingleFilms;
