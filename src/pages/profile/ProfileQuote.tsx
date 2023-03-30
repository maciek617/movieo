interface ProfileQouteProps {
  title: string;
  desc: string;
  showQoutes: boolean;
}
function ProfileQuote(props: ProfileQouteProps) {
  return (
    <div className='bg-gray-600 p-4 rounded-md'>
      <h1 className='font-bold text-2xl'>{props.title}</h1>
      <p className='max-w-lg'>
        {props.showQoutes && <i className='fa-solid fa-quote-left pr-1'></i>}
        {props.desc}
        {props.showQoutes && <i className='fa-solid fa-quote-right pl-1'></i>}
      </p>
    </div>
  );
}

export default ProfileQuote;
