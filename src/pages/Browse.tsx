import { useState } from 'react';
import {
  menuCategories,
  streamingCategories,
  typeCategories,
} from './browse-film/categories';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createBucket } from '../helpers/createBucket';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../App';
import SideCategory from './browse-film/SideCategory';
import SingleFilmBox from './browse-film/SingleFilmBox';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import {
  updateData,
  updateMenu,
  updatePlatform,
  updateType,
} from '../features/browseFilters';

function Browse() {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const dispatch = useDispatch();
  const [allMovies, setAllMovies] = useState<any>();
  const type = useSelector((state: any) => state.browse.type);
  const platform = useSelector((state: any) => state.browse.platform);
  const menu = useSelector((state: any) => state.browse.menu);
  const dataFilms = useSelector((state: any) => state.browse.data);

  const createNewBucket = async () => {
    if (!currentUser) return;
    const { data } = await supabase.storage.getBucket(currentUser?.id);
    if (data) return;

    createBucket(currentUser?.id);
  };

  const [clickedMenuIndex, setClickedMenuIndex] = useState<number>(0);
  const [clickedPlatformIndex, setClickedPlatformIndex] = useState<number>(0);
  const [clickedTypeIndex, setClickedTypeIndex] = useState<number>(0);

  useEffect(() => {
    dispatch(updateMenu(menuCategories[clickedMenuIndex].name));
    dispatch(updatePlatform(streamingCategories[clickedPlatformIndex].name));
    dispatch(updateType(typeCategories[clickedTypeIndex].name));
  }, [clickedMenuIndex, clickedPlatformIndex, clickedTypeIndex]);

  // Get all movies on page load
  useEffect(() => {
    setAllMovies([]);
    const fetchAllMovies = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .limit(10);

      if (error || !data) return;
      setAllMovies(data);
      dispatch(updateData(data));
    };
    fetchAllMovies();
  }, []);

  const sortArrayBasedOnRating = () => {
    setAllMovies([...allMovies].sort((a: any, b: any) => b.rating - a.rating));
  };

  const sortArrayBasedOnDate = () => {
    if (!allMovies) return;
    setAllMovies(
      [...allMovies].sort(
        (a: any, b: any) => +new Date(b.created_at) - +new Date(a.created_at)
      )
    );
  };

  const sortArrayBasedOnPlatform = () => {
    setAllMovies(
      [...dataFilms].filter(
        (item: any) => item.platform === platform && item.type === type
      )
    );
  };

  const sortArrayBasedOnType = () => {
    setAllMovies(
      [...dataFilms].filter(
        (item: any) => item.type === type && item.platform === platform
      )
    );
  };

  useEffect(() => {
    menu === 'Most Popular'
      ? sortArrayBasedOnRating()
      : menu === 'Recent'
      ? sortArrayBasedOnDate()
      : null;
  }, [menu]);

  useEffect(() => {
    if (!allMovies) return;
    sortArrayBasedOnPlatform();
  }, [platform]);

  useEffect(() => {
    if (!allMovies) return;

    sortArrayBasedOnType();
  }, [type]);

  return (
    <div className='w-full bg-main-dark'>
      <div className='container mx-auto pt-20 w-full px-4 flex text-white flex-col-reverse justify-center items-center lg:flex-row lg:items-start'>
        <div className='sidebar-left w-full lg:w-1/5'>
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
                  addClasses='mt-5'
                  fn={createNewBucket}
                />
              </Link>
              <Link to={'/report'}>
                <Button text='Report problem' addClasses='mt-5 ml-5 lg:ml-0' />
              </Link>
            </div>
          )}
        </div>

        <div className='main-board w-3/4 rounded-md shadow-lg mx-12 px-[1px]'>
          {!allMovies || allMovies.length < 1 ? (
            <div className='pt-10'>
              <Spinner />
              <p className='text-center mt-10 font-bold'>No data.</p>
            </div>
          ) : (
            <div className='flex pt-10 flex-wrap gap-5 justify-center lg:justify-start'>
              {allMovies?.map((film: any) => {
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
              })}
            </div>
          )}
        </div>

        <div className='sidebar-right w-full lg:w-1/5'>
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
