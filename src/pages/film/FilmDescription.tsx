import moment from 'moment';
interface FilmDescriptionProps {
  desc: string;
  showCreated: boolean;
  createdDate: string;
}
function FilmDescription({ ...props }: FilmDescriptionProps) {
  return (
    <div className='py-10 text-white'>
      <h1 className='text-2xl font-semibold'>Description:</h1>
      <p>{props.desc}</p>
      {props.showCreated && props.createdDate && (
        <p className='text-gray-500 mt-5'>
          Created {moment(props.createdDate).format('LL')}
        </p>
      )}
    </div>
  );
}

export default FilmDescription;
