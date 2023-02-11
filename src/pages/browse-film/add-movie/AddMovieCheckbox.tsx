import React from 'react';

interface AddMovieCheckboxProps {
  labelText: string;
  id: string;
  fn?: any;
}
function AddMovieCheckbox({ ...props }: AddMovieCheckboxProps) {
  return (
    <div>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        type='checkbox'
        id={props.id}
        onChange={() => props.fn((prev: boolean) => !prev)}
      />
    </div>
  );
}

export default AddMovieCheckbox;
