import Pill from '../../components/Pill';
import Rating from './Rating';
import LinkButtons from './LinkButtons';

interface RightSideInfoProps {
  name: string;
  brief: string;
  actors: any;
  platform: string;
  user_id: string;
  currentUserId: string;
  routeId: string | undefined;
  allUsersRates: number;
  ratingScore: number;
}

function RightSideInfo({ ...props }: RightSideInfoProps) {
  return (
    <div className='w-full'>
      <p className='text-3xl font-bold'>{props.name}</p>
      <p className='text-sm pt-3'>{props.brief}</p>
      <p className='py-6 text-2xl'>
        <i className='fa-solid fa-star text-main-yellow mr-2'></i>
        {props.ratingScore} / 5{' '}
        <span className='text-sm'>({props.allUsersRates})</span>
      </p>
      <div className='flex gap-5'>
        {props.actors?.map((actor: any) => {
          return (
            <a
              key={actor}
              href={
                'https://en.wikipedia.org/wiki/' + actor.replaceAll(' ', '_')
              }
              target='_blank'
            >
              <Pill text={actor} icon={false} />
            </a>
          );
        })}
      </div>
      <LinkButtons
        platform={props.platform}
        user_id={props.user_id}
        currentUserId={props.currentUserId}
      />
      <Rating userId={props.currentUserId} routeId={props.routeId} />
    </div>
  );
}

export default RightSideInfo;
