import React from 'react';

interface AddMovieInputProps {
  labelTitle: string;
  inputType: string;
  inputPlaceholder: string;
  functionHandler: any;
  textHandler: string;
}

// Refs vs setState pass refs through parent component or share state through one level

function AddMovieInput({ ...props }: AddMovieInputProps) {
  return (
    <div className='flex flex-col'>
      <label className='font-semibold text-xl mb-3'>{props.labelTitle}</label>
      <input
        className='text-white max-w-sm border-0 border-b-2 border-white bg-transparent outline-0'
        type={props.inputType}
        placeholder={props.inputPlaceholder}
        onChange={(e: any) => props.functionHandler(e.target.value)}
        value={props.textHandler}
      />
    </div>
  );
}

export default AddMovieInput;
