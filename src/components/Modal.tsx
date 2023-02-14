import { useEffect } from 'react';

interface ModalProps {
  text: string;
  fn?: any;
  error?: boolean;
}

function Modal({ ...props }: ModalProps) {
  const clickEsc = (e: any) => {
    return e.key === 'Escape';
  };

  useEffect(() => {
    window.addEventListener('click', (e: any) => {
      e.target.classList.contains('darken-bg') ? props.fn('') : null;
    });

    return () => {
      window.removeEventListener('click', (e: any) => {
        e.target.classList.contains('darken-bg') ? props.fn('') : null;
      });
    };
  }, []);

  useEffect(() => {
    window.addEventListener('keyup', (e: any) => {
      clickEsc(e) ? props.fn('') : null;
    });

    return () => {
      window.addEventListener('keyup', (e: any) => {
        clickEsc(e) ? props.fn('') : null;
      });
    };
  }, []);
  return (
    <div className='fixed top-0 left-0 h-screen w-full flex items-center justify-center darken-bg flex-col'>
      <div className='relative bg-white px-10 py-4 rounded-md'>
        {props.error && (
          <div className='mt-8 flex items-center justify-center flex-col'>
            <i className='fa-solid fa-face-frown text-6xl'></i>
            <p className='text-red-400 pt-1 text-center'>
              Oppps! Something went wrong
            </p>
          </div>
        )}
        <i
          onClick={() => props.fn('')}
          className='fa-solid fa-xmark cursor-pointer absolute top-2 right-4 text-2xl'
        ></i>
        <p className='pt-5 pb-10 text-xl font-semibold text-center'>
          "{props.text}"
        </p>
      </div>
    </div>
  );
}

export default Modal;
