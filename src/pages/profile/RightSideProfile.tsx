import SingleFilmBox from '../browse-film/SingleFilmBox';
import ProfileSingleField from './ProfileSingleField';

interface RightSideProfileProps {
  posts: number;
  comments: number;
  brief: string;
  hobby: Array<string>;
  comment: string;
}

function RightSideProfile({ ...props }: RightSideProfileProps) {
  const allHobbies = props.hobby
    ? props.hobby
    : ['Add hobby 1', 'Add hobby 2', 'Add hobby 3'];

  const hobbies = allHobbies.map((hobby: string) => {
    return (
      <p key={hobby} className='text-md max-w-3xl'>
        {hobby}
      </p>
    );
  });
  return (
    <div>
      <ProfileSingleField
        title='brief'
        title_depth={props.brief}
        bigFont={false}
      />
      <div className='mt-5'>
        <p className='uppercase font-semibold text-sm tracking-wider text-gray-400'>
          <i className='fa-solid fa-gamepad'></i> hobby
        </p>
        {hobbies}
      </div>
      <div className='mt-5'>
        <p className='uppercase font-semibold text-sm tracking-wider text-gray-400'>
          <i className='fa-solid fa-chart-line'></i> statistics
        </p>
        <p className='text-md max-w-3xl'>Reviews: {props.posts} </p>
        <p className='text-md max-w-3xl'>Comments: {props.comments} </p>
        <p className='text-md max-w-3xl'>Total active time: </p>
      </div>
      <div className='mt-5'>
        <p className='uppercase font-semibold text-sm tracking-wider text-gray-400'>
          <i className='fa-solid fa-fire'></i> latest post
        </p>
        <div className='max-w-sm mt-1'>
          <SingleFilmBox
            image={
              'https://images.pexels.com/photos/13043541/pexels-photo-13043541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            }
            filmTitle={'Test movie'}
            filmType={'Science Fiction'}
            streamingPlatform={'Apple TV'}
            rating={8.3}
          />
        </div>
      </div>
      <ProfileSingleField
        title='latest comment'
        title_depth={`"${
          props.comment !== '[]'
            ? props.comment
            : 'User did not comment any review.'
        }"`}
      />
    </div>
  );
}

export default RightSideProfile;
