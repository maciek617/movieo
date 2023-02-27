import ComingSoonFilm from './coming-soon/ComingSoonFilm';
import { useEffect, useState } from 'react';

function ComingSoon() {
  const [upcomingMovies, setUpcomingMovies] = useState<any>();
  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const res = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=bfcd499477623cb97e74b8ea8f48f0fd'
      );
      const movies = await res.json();
      setUpcomingMovies(movies.results.reverse());
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
    <div className='py-32 min-h-screen bg-main-dark flex gap-20 justify-center flex-wrap'>
      {movies}
    </div>
  );
}

// TODO: .Env file with api key with stored infos about upcoming movies

export default ComingSoon;
