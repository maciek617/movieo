import React from 'react';

interface CategoriesToChooseProps {
  name: string;
  icon: string;
}

interface SideCategoryProps {
  categoryTitle: string;
  categoriesToChoose: Array<CategoriesToChooseProps>;
  setClickedIndex: any;
  clickedIndex: number;
}

function SideCategory({ ...props }: SideCategoryProps) {
  const elements = props.categoriesToChoose.map((cat, index) => {
    return (
      <p
        className={`font-semibold py-1 cursor-pointer hover:text-main-yellow transition-all ${
          props.clickedIndex === index ? 'text-main-yellow' : null
        }`}
        key={index}
        onClick={() => props.setClickedIndex(index)}
      >
        <i className={cat.icon}></i>
        {cat.name}
      </p>
    );
  });
  return (
    <div>
      <h1 className='text-2xl font-bold pt-6'>{props.categoryTitle}</h1>
      {elements}
    </div>
  );
}

export default SideCategory;
