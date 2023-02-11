import React from 'react';

function Spinner() {
  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='w-10 h-10 rounded-full border-t-2 border-main-yellow animate-spin'></div>
      <p>Loading...</p>
    </div>
  );
}

export default Spinner;
