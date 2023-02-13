import React, { useState } from 'react';
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

  const [m, setM] = useState<string>('');
  const [p, setP] = useState<string>('');
  const [t, setT] = useState<string>('');

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
    if (m && p && t) {
      navigate('/browse/' + m + '/' + p + '/' + t);
      // Fetch data from database, based on these parameters m,p,t, after navigation
    }
  }, [m, t, p]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('movies').select();

      if (!error) {
        setData(data);
      }
    };

    fetchData();
  }, []);

  const eachFilm = data?.map((film: any) => {
    return (
      <SingleFilmBox
        key={film.id}
        image={film.image}
        filmTitle={film.name}
        filmType={film.type}
        streamingPlatform={film.platform}
        rating={film.rating}
      />
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
            <Link to={'/add-movie'}>
              <Button
                text='Add movie'
                icon={true}
                addClasses='mt-5'
                fn={createNewBucket}
              />
            </Link>
          )}
        </div>

        <div className='main-board w-3/4 border border-black rounded-md shadow-lg mx-8'>
          {!data ? (
            <Spinner />
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
