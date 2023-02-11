import React from 'react';
import { useEffect } from 'react';

interface ModalProps {
  text: string;
  fn?: any;
}

function Modal({ ...props }: ModalProps) {
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
  return (
    <div className='fixed top-0 left-0 h-screen w-full flex items-center justify-center darken-bg'>
      <div className='relative bg-white px-10 py-4 rounded-md'>
        <i
          onClick={() => props.fn('')}
          className='fa-solid fa-xmark cursor-pointer absolute top-2 right-4 text-2xl'
        ></i>
        <p className='py-10'>{props.text}</p>
      </div>
    </div>
  );
}

export default Modal;
