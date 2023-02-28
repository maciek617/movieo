import moment from "moment";
interface ComingSoonProps {
  filmImage: string;
  filmDate: number;
  filmTitle: string;
}

function ComingSoonFilm({ ...props }: ComingSoonProps) {
  return (
    <div>
      <div className='relative w-72 h-80 border border-main-yellow rounded'>
        <img
          src={props.filmImage}
          alt='coming soon film'
          loading='lazy'
          className='grayscale-[85%] h-full w-full'
        />
        <p className='coming-soon-date text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl w-full text-center bg-main-yellow py-2'>
          {moment(props.filmDate).format('LL')}
        </p>
        <p className='text-white text-center py-2'>{props.filmTitle}</p>
      </div>
    </div>
  );
}

export default ComingSoonFilm;
