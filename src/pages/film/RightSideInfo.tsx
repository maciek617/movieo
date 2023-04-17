import Pill from '../../components/Pill';
import Rating from './Rating';
import LinkButtons from './LinkButtons';
import Tooltip from '../../components/Tooltip';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  user_can_vote: boolean;
  show_profile: boolean;
}

function RightSideInfo({ ...props }: RightSideInfoProps) {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  return (
    <div className='w-full'>
      {showTooltip && (
        <Tooltip
          text='Copied!'
          variant='green'
          closeTooltip={setShowTooltip}
          isShow={showTooltip}
        />
      )}
      <div className='flex justify-between absolute top-20 left-1/2 -translate-x-1/2 w-full px-6 container mx-auto mt-1 sm:px-0'>
        <p onClick={() => navigate(-1)} className='cursor-pointer'>
          <i className='fa-solid fa-arrow-left mr-2'></i>Back
        </p>
        <i
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShowTooltip(true);
          }}
          className='fa-solid fa-share cursor-pointer text-main-yellow text-xl mr-3'
        ></i>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-3xl font-bold'>{props.name}</p>
      </div>
      <p className='text-sm pt-3'>{props.brief}</p>
      {props.user_can_vote && (
        <p className='pt-6 text-2xl'>
          <i className='fa-solid fa-star text-main-yellow mr-2'></i>
          {props.ratingScore} / 5{' '}
          <span className='text-sm'>({props.allUsersRates})</span>
        </p>
      )}
      {props.currentUserId ? (
        <Rating
          userId={props.currentUserId}
          routeId={props.routeId}
          user_can_vote={props.user_can_vote}
        />
      ) : (
        <p className='text-red-400 my-5'>Log in to vote.</p>
      )}
      <div className={`flex gap-5 ${!props.user_can_vote && 'mt-5'}`}>
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
        show_profile={props.show_profile}
        routeId={props.routeId}
      />
    </div>
  );
}

export default RightSideInfo;
