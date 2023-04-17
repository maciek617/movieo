import React from 'react';

interface PillProps {
  text: string;
  icon: boolean
}

function Pill({ ...props }: PillProps) {
  return (
    <div className='bg-red-900 px-4 py-1 rounded-md cursor-pointer hover:bg-red-800 transition-colors'>
      <p>
        {props.text}{' '}
        {props.icon && (
          <span>
            <i className='fa-solid fa-minus cursor-pointer'></i>
          </span>
        )}
      </p>
    </div>
  );
}

export default Pill;
