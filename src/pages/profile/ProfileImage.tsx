interface ProfileImageProps {
  image: string;
  name: string;
}

function ProfileImage({ ...props }: ProfileImageProps) {
  return (
    <div className='h-72 w-full rounded-md shadow border border-main-yellow flex items-center justify-center'>
      {props.image ? (
        <img
          src={props.image}
          alt='profile picture'
          className='w-full h-full object-cover rounded-md '
        />
      ) : (
        <p className='text-7xl'>{props.name}</p>
      )}
    </div>
  );
}

export default ProfileImage;
