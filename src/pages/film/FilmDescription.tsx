import moment from 'moment';
interface FilmDescriptionProps {
  desc: string;
  showCreated: boolean;
  createdDate: string;
}
function FilmDescription({ ...props }: FilmDescriptionProps) {
  return (
    <div>
      <p className='text-white py-10'>{props.desc}</p>
      {props.showCreated && props.createdDate && (
        <p className='text-gray-500'>
          Created {moment(props.createdDate).format('LL')}
        </p>
      )}
    </div>
  );
}

export default FilmDescription;
