import { useEffect } from 'react';
import { useRef } from 'react';
interface TooltipProps {
  variant: 'green' | 'red';
  text: string;
  closeTooltip: any;
  isShow: boolean;
}
function Tooltip({ ...props }: TooltipProps) {
  const tooltipContainer = useRef<any>();

  const variants = {
    green: 'border-green-300 text-green-50',
    red: 'border-red-400 text-red-200',
  };

  useEffect(() => {
    const addOutAnimationClass = setTimeout(() => {
      tooltipContainer.current.classList.remove('animate-slide-right');
      tooltipContainer.current.classList.add('animate-slide-out');
    }, 5000);

    const closeTooltip = setTimeout(() => {
      props.closeTooltip(false);
    }, 5400);

    return () => {
      clearTimeout(addOutAnimationClass);
      clearTimeout(closeTooltip);
    };
  }, [props.isShow]);

  return (
    <div
      ref={tooltipContainer}
      className={`z-[51] animate-slide-right fixed w-52 h-12 bg-main-dark top-32 right-10 rounded-md flex items-center justify-center border-2 ${
        variants[props.variant]
      }`}
    >
      <i
        onClick={() => {
          tooltipContainer.current.classList.remove('animate-slide-right');
          tooltipContainer.current.classList.add('animate-slide-out');
          setTimeout(() => {
            props.closeTooltip(false);
          }, 400);
        }}
        className='fa-solid fa-xmark absolute top-1 right-3 cursor-pointer'
      ></i>
      <p>{props.text}</p>
    </div>
  );
}

export default Tooltip;
