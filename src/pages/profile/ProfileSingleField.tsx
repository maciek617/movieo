interface ProfileSingleFieldProps {
  title: string;
  title_depth: string;
  bigFont?: boolean;
}

function ProfileSingleField({ ...props }: ProfileSingleFieldProps) {
  return (
    <div className='mt-5'>
      <p className='uppercase font-semibold text-sm tracking-wider text-gray-400'>
        <i className='fa-solid fa-clock'></i> {props.title}
      </p>
      <p className={`${props.bigFont ? 'text-2xl' : 'text-md'}`}>
        {props.title_depth}
      </p>
    </div>
  );
}

export default ProfileSingleField;
