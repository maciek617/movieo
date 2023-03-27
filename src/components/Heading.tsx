interface HeadingProps {
  title: string;
  description: string;
}
function Heading({ ...props }: HeadingProps) {
  return (
    <div className='px-4 text-white'>
      <h1 className='text-center text-2xl font-bold max-w-5xl mx-auto md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl'>
        {props.title}
      </h1>
      <p className='text-sm text-center max-w-2xl mx-auto py-2 md:text-md lg:text-lg'>
        {props.description}
      </p>
    </div>
  );
}

export default Heading;
