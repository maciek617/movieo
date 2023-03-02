import Spinner from '../components/Spinner';
import ComingSoonFilm from './coming-soon/ComingSoonFilm';
import { useEffect, useState } from 'react';

function ComingSoon() {
  const [upcomingMovies, setUpcomingMovies] = useState<any>([]);

  // TODO: Sort array based on release date
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

  const movies = upcomingMovies?.map((movie: any, index: number) => {
    return (
      <ComingSoonFilm
        key={movie.title}
        filmTitle={movie.title}
        filmImage={'http://image.tmdb.org/t/p/w500/' + movie.poster_path}
        filmDate={Date.parse(movie.release_date)}
      />
    );
  });

  return (
    // { movies: <Spinner /> }
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

// TODO: .Env file with api key with stored infos about upcoming movies

export default ComingSoon;
