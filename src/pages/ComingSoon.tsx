import ComingSoonFilm from './coming-soon/ComingSoonFilm';

function ComingSoon() {
  // TODO: Find a best alternative to see upcoming movies
  return (
    <div className='pt-32 min-h-screen bg-main-dark flex gap-10 justify-center flex-wrap'>
      {/* Conditionaly render movies here  */}
      <ComingSoonFilm />
      <ComingSoonFilm />
      <ComingSoonFilm />
      <ComingSoonFilm />
    </div>
  );
}

// TODO: .Env file with api key with stored infos about upcoming movies

export default ComingSoon;
