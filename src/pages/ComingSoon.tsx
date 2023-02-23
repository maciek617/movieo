import ComingSoonFilm from './coming-soon/ComingSoonFilm';
function ComingSoon() {
  return (
    <div className='pt-32 min-h-screen bg-main-dark flex gap-10 justify-center flex-wrap'>
      <ComingSoonFilm />
      <ComingSoonFilm />
      <ComingSoonFilm />
      <ComingSoonFilm />
    </div>
  );
}

export default ComingSoon;
