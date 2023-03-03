import { useState } from 'react';
import {
  menuCategories,
  streamingCategories,
  typeCategories,
} from './browse-film/categories';
import SideCategory from './browse-film/SideCategory';
import SingleFilmBox from './browse-film/SingleFilmBox';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import { createBucket } from '../helpers/createBucket';
import { useSelector } from 'react-redux';
import { supabase } from '../App';

function Browse() {
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const [data, setData] = useState<any>();

  const createNewBucket = async () => {
    if (!currentUser) return;
    const { data } = await supabase.storage.getBucket(currentUser?.id);
    if (data) return;

    createBucket(currentUser?.id);
  };

  const [clickedMenuIndex, setClickedMenuIndex] = useState<number>(0);
  const [clickedPlatformIndex, setClickedPlatformIndex] = useState<number>(0);
  const [clickedTypeIndex, setClickedTypeIndex] = useState<number>(0);

  // Initial string types
  const [m, setM] = useState<string>('most-popular');
  const [p, setP] = useState<string>('netflix');
  const [t, setT] = useState<string>('action');

  useEffect(() => {
    setM(
      menuCategories[clickedMenuIndex].name.toLowerCase().replaceAll(' ', '-')
    );

    setP(
      streamingCategories[clickedPlatformIndex].name
        .toLowerCase()
        .replaceAll(' ', '-')
    );

    setT(
      typeCategories[clickedTypeIndex].name.toLowerCase().replaceAll(' ', '-')
    );

    return;
  }, [clickedMenuIndex, clickedPlatformIndex, clickedTypeIndex]);

  useEffect(() => {
    setData([]);
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('type', t.charAt(0).toUpperCase() + t.slice(1))
        .eq('platform', p.charAt(0).toUpperCase() + p.slice(1))
        .limit(10);

      if (!error) {
        setData(data);
      }
    };

    if (m || p || t) {
      navigate('/browse/' + m + '/' + p + '/' + t);
      // Fetch data from database, based on these parameters m,p,t, after navigation
      fetchData();
    }
  }, [m, t, p]);

  useEffect(() => {
    setData([]);
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('type', t.charAt(0).toUpperCase() + t.slice(1))
        .eq('platform', p.charAt(0).toUpperCase() + p.slice(1))
        .limit(10);

      if (error && !data) return;
      setData(data);
    };
    fetchData();
  }, []);

  const eachFilm = data?.map((film: any) => {
    return (
      <Link to={'/movie/' + film.id} key={film.id}>
        <SingleFilmBox
          image={film.image}
          filmTitle={film.name}
          filmType={film.type}
          streamingPlatform={film.platform}
          rating={film.rating.toFixed(1)}
          user_can_vote={film.user_can_vote}
        />
      </Link>
    );
  });

  return (
    <div className='w-full bg-main-dark'>
      <div className='container mx-auto pt-20 w-full flex text-white'>
        <div className='sidebar-left w-1/5'>
          <SideCategory
            categoryTitle='Menu'
            categoriesToChoose={menuCategories}
            clickedIndex={clickedMenuIndex}
            setClickedIndex={setClickedMenuIndex}
          />
          {currentUser?.id && (
            <div>
              <Link to={'/add-movie'}>
                <Button
                  text='Add movie'
                  icon={true}
                  addClasses='mt-5'
                  fn={createNewBucket}
                />
              </Link>
              <Button text='Report a problem' addClasses='mt-5' />
            </div>
          )}
        </div>

        <div className='main-board w-3/4 border border-black rounded-md shadow-lg mx-8'>
          {!data || data.length < 1 ? (
            <div className='pt-10'>
              <Spinner />
            </div>
          ) : (
            <div className='flex justify-evenly pt-10 flex-wrap gap-5'>
              {eachFilm}
            </div>
          )}
        </div>

        <div className='sidebar-right w-1/5'>
          <SideCategory
            categoryTitle='Platform'
            categoriesToChoose={streamingCategories}
            clickedIndex={clickedPlatformIndex}
            setClickedIndex={setClickedPlatformIndex}
          />
          <SideCategory
            categoryTitle='Type'
            categoriesToChoose={typeCategories}
            clickedIndex={clickedTypeIndex}
            setClickedIndex={setClickedTypeIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default Browse;
