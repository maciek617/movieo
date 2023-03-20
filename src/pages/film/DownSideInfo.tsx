import FilmComments from './FilmComments';
import FilmDescription from './FilmDescription';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../App';
import SingleFilmBox from '../browse-film/SingleFilmBox';
interface DownSideInfoProps {
  desc: string;
  showComments: boolean;
  showCreated: boolean;
  createdDate: string;
  creatorId: string;
  filmType: string;
  id: string | undefined;
}
function DownSideInfo({ ...props }: DownSideInfoProps) {
  const currentUser = useSelector((state: any) => state.currentUser.value);
  const [relatedMovies, setRelatedMovies] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('type', props.filmType)
        .limit(4);

      if (!data || error) return;

      const formattedData = data.filter(
        (info: any) => info.id !== Number(props.id)
      );

      setRelatedMovies(
        formattedData?.length === 4
          ? formattedData?.slice(0, -1)
          : formattedData
      );
    };
    fetchData();
  }, [props.id]);
  const relFilm = relatedMovies?.map((movie: any, index: number) => {
    return (
      <Link to={'/movie/' + movie?.id} key={movie?.id} replace>
        <SingleFilmBox
          image={movie?.image}
          filmTitle={movie?.name}
          filmType={movie?.type}
          user_can_vote={movie?.user_can_vote}
          streamingPlatform={movie?.platform}
          rating={movie?.rating}
          small={true}
        />
      </Link>
    );
  });

  return (
    <>
      <FilmDescription
        desc={props.desc}
        showCreated={props.showCreated}
        createdDate={props.createdDate}
      />
      {props.showComments && currentUser?.id ? (
        <>
          {relFilm?.length > 0 && (
            <div className='text-white'>
              <h2 className='text-2xl py-2'>Related movies</h2>
              <div className='flex flex-wrap gap-10'>{relFilm}</div>
            </div>
          )}
          <FilmComments
            userId={currentUser?.id}
            userImage={currentUser?.image ? currentUser?.image : ''}
            userName={currentUser?.user_metadata?.name}
            creatorId={props.creatorId}
          />
        </>
      ) : (
        <div>
          <p className='text-red-400 mt-5'>
            {currentUser?.id
              ? 'User do not allow to comment this review.'
              : 'You have to be logged in to comment.'}
          </p>
          {!currentUser?.id && (
            <Link to={'/login'} replace>
              <Button text={'Login'} icon={true} addClasses='mt-3' />
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default DownSideInfo;
