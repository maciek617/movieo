import Spinner from '../components/Spinner';
import ComingSoonFilm from './coming-soon/ComingSoonFilm';
import { useEffect, useState } from 'react';

function ComingSoon() {
  const [upcomingMovies, setUpcomingMovies] = useState<any>([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const res = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=' +
          import.meta.env.VITE_API_KEY
      );
      const movies = await res.json();
      setUpcomingMovies(movies.results);
    };

    fetchUpcomingMovies();
  }, []);

  const sortedByDateUpcomingMovies = upcomingMovies?.sort((a: any, b: any) => {
    return (
      new Date(b?.release_date).valueOf() - new Date(a?.release_date).valueOf()
    );
  });

  const movies = sortedByDateUpcomingMovies?.map(
    (movie: any, index: number) => {
      return (
        <ComingSoonFilm
          key={movie.title}
          filmTitle={movie.title}
          filmImage={'http://image.tmdb.org/t/p/w500/' + movie.poster_path}
          filmDate={Date.parse(movie.release_date)}
        />
      );
    }
  );

  return (
    <div className='min-h-screen bg-main-dark py-32'>
      {movies ? (
        <div className='flex gap-20 justify-center flex-wrap container mx-auto'>
          {movies}
        </div>
      ) : (
        <Spinner isDark={true} />
      )}
    </div>
  );
}

export default ComingSoon;
