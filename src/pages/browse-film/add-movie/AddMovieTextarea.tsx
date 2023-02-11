import React from 'react';
import { countSingleWords } from '../../../helpers/countWords';

interface AddMovieTextareaProps {
  labelTitle: string;
  textareaPlaceholder: string;
  functionHandler: any;
  textHandlerValue: string;
  maxChar: number;
  big: boolean;
}

// TODO: Track enters and save with it to database and after all resolve

function AddMovieTextarea({ ...props }: AddMovieTextareaProps) {
  return (
    <div>
      <div
        className={`flex flex-col ${props.big ? 'max-w-5xl' : ' max-w-2xl'}`}
      >
        <label className='font-semibold text-xl mb-3'>{props.labelTitle}</label>
        <textarea
          className='text-white w-full border-0 border-b-2 border-white bg-transparent outline-0 max-h-56 min-h-[30px]'
          placeholder={props.textareaPlaceholder}
          onChange={(e: any) => props.functionHandler(e.target.value)}
        />
        <p className='text-right py-2'>
          {countSingleWords(props.textHandlerValue)}/ {props.maxChar}
        </p>
      </div>
    </div>
  );
}

export default AddMovieTextarea;