interface ProfileImageProps {
  image: string;
  name: string;
  rounded?: boolean;
}

function ProfileImage({ ...props }: ProfileImageProps) {
  return (
    <div
      className={`h-full w-full rounded-md shadow border border-main-yellow flex items-center justify-center ${
        props.rounded ? 'rounded-full' : ''
      }`}
    >
      {props.image ? (
        <img
          src={props.image}
          alt='profile picture'
          className={`w-full h-full object-cover rounded-md ${
            props.rounded ? 'rounded-full' : ''
          }`}
        />
      ) : (
        <p className='text-7xl'>{props?.name?.charAt(0)}</p>
      )}
    </div>
  );
}

export default ProfileImage;
