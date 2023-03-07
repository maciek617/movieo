interface IconToggleProps {
  show: boolean;
  setShow: any;
}

function IconToggle({ ...props }: IconToggleProps) {
  return (
    <div
      onClick={() => props.setShow((prev: boolean) => (prev = !prev))}
      className='absolute top-1/2 right-3 cursor-pointer'
    >
      <i
        className={`fa-solid fa-eye${!props.show ? '' : '-slash'} text-black`}
      ></i>
    </div>
  );
}

export default IconToggle;
