function ComingSoonFilm() {
  return (
    <div>
      <div className='relative w-72 h-80 border border-main-yellow rounded'>
        <img
          src='https://images.pexels.com/photos/13043541/pexels-photo-13043541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt='coming soon film'
          loading='lazy'
          className='grayscale h-full w-full'
        />
        <p className='coming-soon-date text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-3xl'>
          26.02.2023
        </p>
        <p className='text-white text-center py-2'>Title of a movie.</p>
      </div>
    </div>
  );
}

export default ComingSoonFilm;
