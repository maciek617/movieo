import { Link } from 'react-router-dom';
import Button from '../../components/Button';

interface LinkButtonsProps {
  platform: string;
  user_id: string;
}
function LinkButtons({ ...props }: LinkButtonsProps) {
  return (
    <div className='mt-10'>
      <a href={`https://www.${props.platform}.com`} target='_blank'>
        <Button text={props.platform} icon={true} addClasses='mr-5' />
      </a>
      <Link to={'/profile/' + props.user_id}>
        <Button text={`Author's profile`} icon={true} />
      </Link>
    </div>
  );
}
export default LinkButtons;
