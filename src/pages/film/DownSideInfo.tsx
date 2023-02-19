import FilmDescription from './FilmDescription';

interface DownSideInfoProps {
  desc: string;
}
function DownSideInfo({ ...props }: DownSideInfoProps) {
  return <FilmDescription desc={props.desc} />;
}

export default DownSideInfo;
