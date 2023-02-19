interface FilmDescriptionProps {
  desc: string;
}
function FilmDescription({...props}: FilmDescriptionProps) {
  return (
    <div>
      <p className='text-white py-10'>{props.desc}</p>
    </div>
  );
}

export default FilmDescription;
