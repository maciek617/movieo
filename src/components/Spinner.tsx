import React from 'react';

interface SpinnerProps {
  isDark?: boolean;
}
function Spinner({ ...props }: SpinnerProps) {
  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='w-10 h-10 rounded-full border-t-2 border-main-yellow animate-spin'></div>
      <p className={`${props.isDark ? 'text-white' : ''}`}>Loading...</p>
    </div>
  );
}

export default Spinner;
