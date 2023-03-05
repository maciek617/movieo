interface AddMovieImageScreenProps {
  img: string;
}

function AddMovieImageScreen({ ...props }: AddMovieImageScreenProps) {
  return !props.img ? (
    <div className='flex items-center gap-5'>
      <p className='text-center text-2xl'>Add movie image</p>
      <i className='fa-solid fa-image text-3xl'></i>
    </div>
  ) : (
    <div className='group z-40 hover:scale-105 transition-all'>
      <img
        src={props.img}
        alt='Movie image cover'
        className='w-52 h-52 object-cover'
      />
      <p className='text-center opacity-0 group-hover:opacity-100 transition-all'>
        Change photo
      </p>
    </div>
  );
}

export default AddMovieImageScreen;
