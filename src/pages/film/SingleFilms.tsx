import { useParams } from 'react-router-dom';
import { supabase } from '../../App';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import RightSideInfo from './RightSideInfo';
import LeftSideInfo from './LeftSideInfo';
import DownSideInfo from './DownSideInfo';

function SingleFilms() {
  const { id } = useParams();
  const [filmData, setFilmData] = useState<any>({});

  useEffect(() => {
    const fetchData = async (filmId: string) => {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('id', filmId);

      if (data && !error) setFilmData(data[0]);
    };

    if (!id) return;
    return () => {
      fetchData(id);
    };
  }, []);

  return (
    <div className='pt-32 px-6 bg-main-dark min-h-screen'>
      {filmData ? (
        <div className=' container mx-auto'>
          <div className='w-full h-96 flex justify-around gap-10 text-white'>
            <LeftSideInfo image={filmData?.image} type={filmData?.type} />
            <RightSideInfo
              name={filmData?.name}
              brief={filmData?.brief}
              actors={filmData?.actors}
              platform={filmData?.platform}
              user_id={filmData?.user_id}
            />
          </div>
          <DownSideInfo
            desc={filmData?.description}
            showComments={filmData?.show_comments}
          />
        </div>
      ) : (
        <Spinner isDark={true} />
      )}
    </div>
  );
}

export default SingleFilms;
