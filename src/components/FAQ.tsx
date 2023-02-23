import { useState } from 'react';
interface FAQProps {
  faqs: Array<any>;
}
function FAQ({ ...props }: FAQProps) {
  // What to expect
  const [clickedIndex, setClickedIndex] = useState<number>(0);
  const allFaqs = props.faqs.map((fq, index) => {
    return (
      <div
        key={index}
        className='max-w-2xl w-full text-left mx-auto my-10 hover:text-main-yellow'
      >
        <p
          onClick={() => setClickedIndex(index)}
          className='cursor-pointer text-xl font-semibold flex items-center justify-between'
        >
          {fq.title}
          <i className='fa-solid fa-angle-down'></i>
        </p>
        {index === clickedIndex && (
          <p className='max-w-lg w-full'>{fq.description}</p>
        )}
      </div>
    );
  });
  return <div>{allFaqs}</div>;
}

export default FAQ;
