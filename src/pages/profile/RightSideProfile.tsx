import SingleFilmBox from '../browse-film/SingleFilmBox';

function RightSideProfile() {
  return (
    <div>
      <div>
        <p className='uppercase font-semibold text-sm tracking-wider text-gray-400'>
          <i className='fa-solid fa-briefcase'></i> brief
        </p>
        <p className='text-md max-w-3xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil harum
          velit ut deleniti ullam beatae magnam laboriosam repudiandae accusamus
          iste rerum adipisci dolores culpa aliquid ad sit, non deserunt
          eligendi.
        </p>
      </div>
      {/* Hobby optional */}
      <div className='mt-5'>
        <p className='uppercase font-semibold text-sm tracking-wider text-gray-400'>
          <i className='fa-solid fa-gamepad'></i> hobby
        </p>
        <p className='text-md max-w-3xl'>Swimming</p>
        <p className='text-md max-w-3xl'>Riding a bike</p>
        <p className='text-md max-w-3xl'>Listening to music</p>
      </div>
      <div className='mt-5'>
        <p className='uppercase font-semibold text-sm tracking-wider text-gray-400'>
          <i className='fa-solid fa-chart-line'></i> statistics
        </p>
        <p className='text-md max-w-3xl'>Posts: </p>
        <p className='text-md max-w-3xl'>Comments: </p>
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
      <div className='mt-5'>
        <p className='uppercase font-semibold text-sm tracking-wider text-gray-400'>
          <i className='fa-solid fa-comment'></i> latest comment
        </p>
        <p>
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
          perferendis?"
        </p>
      </div>
    </div>
  );
}

// Joined date, Social media box

export default RightSideProfile;
// Post stats posts length, comments length, last active functionality
