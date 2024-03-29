import ProfileSingleField from './ProfileSingleField';

interface RightSideProfileProps {
  posts: number;
  comments: number;
  brief: string;
  hobby: Array<string>;
  comment: string;
}

function RightSideProfile({ ...props }: RightSideProfileProps) {
  const allHobbies = props.hobby.length
    ? props.hobby
    : ['You can', 'Add hobby', 'In edit Page'];

  const hobbies = allHobbies?.map((hobby: string) => {
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
        <p className='uppercase font-semibold text-sm tracking-wider text-gray-400 lg:text-base'>
          <i className='fa-solid fa-gamepad text-main-yellow'></i> hobby
        </p>
        {hobbies}
      </div>
      <div className='mt-5'>
        <p className='uppercase font-semibold text-sm tracking-wider text-gray-400 lg:text-base'>
          <i className='fa-solid fa-chart-line text-main-yellow'></i> statistics
        </p>
        <p className='text-md max-w-3xl'>Reviews: {props.posts} </p>
        <p className='text-md max-w-3xl'>Comments: {props.comments} </p>
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
// first login => set user active flag to true 
// logout => set user flag to false
// user close browser => set user flag to false