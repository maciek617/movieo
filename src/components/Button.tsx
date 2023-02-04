import React from 'react';

interface ButtonProps {
  text: string;
  variant?: string;
  fn?: any;
  icon?: boolean;
  addClasses?: string;
}

function Button({ ...props }: ButtonProps) {
  return (
    <button
      onClick={props.fn}
      className={`px-6 py-2 rounded-lg font-semibold bg-main-yellow text-main-dark ${props.addClasses} hover:bg-yellow-300`}
    >
      {props.text}
      {props.icon ? (
        <i className='fa-solid fa-arrow-up-right-dots ml-2'></i>
      ) : null}
    </button>
  );
}

export default Button;
