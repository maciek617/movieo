interface LeftSideInfoProps {
  image: string;
  type: string;
}
function LeftSideInfo({ ...props }: LeftSideInfoProps) {
  return (
    <div className='w-full relative'>
      <img
        src={props.image}
        alt='cover image'
        className='max-w-3xl w-full h-full object-cover rounded-md'
        loading='lazy'
      />
      <div className='bg-main-yellow absolute top-3 right-3 rounded-lg shadow'>
        <p className='py-2 px-6 text-main-dark'>{props.type}</p>
      </div>
      <div className='bg-main-dark text-white absolute top-3 left-3 rounded-lg shadow-xl'>
        <p className='py-2 px-6 font-bold text-sm'>2021</p>
      </div>
    </div>
  );
}
export default LeftSideInfo;
