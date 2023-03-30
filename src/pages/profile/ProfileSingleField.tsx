interface ProfileSingleFieldProps {
  title: string;
  title_depth: string;
  bigFont?: boolean;
}

function ProfileSingleField({ ...props }: ProfileSingleFieldProps) {
  return (
    <div className='mt-5'>
      <p className='uppercase font-semibold text-sm tracking-wider text-gray-400 lg:text-base'>
        <i className='fa-solid fa-clock text-main-yellow'></i> {props.title}
      </p>
      <p className={`${props.bigFont ? 'text-2xl' : 'text-md'} max-w-xl`}>
        {props.title_depth}
      </p>
    </div>
  );
}

export default ProfileSingleField;
