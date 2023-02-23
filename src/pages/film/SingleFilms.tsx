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

      if (!data && !error) return;
      setFilmData(data);
    };

    if (!id) return;
    return () => {
      fetchData(id);
    };
  }, []);

  return (
    <div className='pt-32 px-6 bg-main-dark min-h-screen'>
      {filmData[0] || filmData[0]?.id ? (
        <div className=' container mx-auto'>
          <div className='w-full h-96 flex justify-around gap-10 text-white'>
            <LeftSideInfo image={filmData[0]?.image} type={filmData[0]?.type} />
            <RightSideInfo
              name={filmData[0]?.name}
              brief={filmData[0]?.brief}
              actors={filmData[0]?.actors}
              platform={filmData[0]?.platform}
              user_id={filmData[0]?.user_id}
            />
          </div>
          <DownSideInfo desc={filmData[0]?.description} />
        </div>
      ) : (
        <Spinner isDark={true} />
      )}
    </div>
  );
}

export default SingleFilms;