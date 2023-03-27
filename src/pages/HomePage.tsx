import { supabase } from '../App';
import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import GeneralInfo from '../home-page/GeneralInfo';
import GreetText from '../home-page/GreetText';
import Slider from '../home-page/Slider';

function HomePage() {
  const [threeFilmsData, setThreeFilmsData] = useState<any>();
  const [generalInfo, setGeneralInfo] = useState<any>();
  const [imageLoad, setImageLoad] = useState<boolean>(false);

  const getThreeFilmsReviewData = async () => {
    const { data, error } = await supabase.from('movies').select('*').limit(3);

    if (!data || error) return;
    setThreeFilmsData(data);
  };

  const getGeneralInfo = async () => {
    const { data, error } = await supabase.from('general').select('*');

    if (!data || error) return;
    setGeneralInfo(data[0]);
  };

  useEffect(() => {
    getThreeFilmsReviewData();
    getGeneralInfo();
  }, []);

  return (
    <div className='min-h-screen bg-main-dark relative'>
      <div className={`${imageLoad ? 'block' : 'hidden'}`}>
        <Slider
          threeFilms={threeFilmsData}
          setImageLoad={setImageLoad}
          imageLoad={imageLoad}
        />
        <GreetText />
        <GeneralInfo post={generalInfo?.post} users={generalInfo?.users} />
      </div>
      {!imageLoad && (
        <div className='absolute z-50 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Spinner isDark={true} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
