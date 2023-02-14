interface AddMovieCheckboxProps {
  labelText: string;
  id: string;
  fn?: any;
}
function AddMovieCheckbox({ ...props }: AddMovieCheckboxProps) {
  return (
    <div className='flex items-center gap-5'>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        type='checkbox'
        className='my-2'
        id={props.id}
        onChange={() => props.fn((prev: boolean) => !prev)}
      />
    </div>
  );
}

export default AddMovieCheckbox;
