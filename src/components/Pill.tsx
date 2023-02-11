import React from 'react';

interface PillProps {
  text: string;
}

function Pill({ ...props }: PillProps) {
  return (
    <div className='bg-red-900 px-4 py-1 rounded-md cursor-pointer'>
      <p>
        {props.text}{' '}
        <span>
          <i className='fa-solid fa-minus cursor-pointer'></i>
        </span>
      </p>
    </div>
  );
}

export default Pill;
