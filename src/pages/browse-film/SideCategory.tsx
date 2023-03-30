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
      <div
        key={index}
        className='border border-main-yellow light-yellow p-2 rounded-full my-2 max-w-[300px]'
      >
        <p
          className={`py-1 cursor-pointer hover:text-main-yellow transition-all text-base lg:text-sm xl:text-base ${
            props.clickedIndex === index ? 'text-main-yellow' : null
          }`}
          onClick={() => props.setClickedIndex(index)}
        >
          <i className={cat.icon}></i>
          {cat.name}
        </p>
      </div>
    );
  });
  return (
    <div>
      <h1 className='text-2xl font-bold pt-6'>{props.categoryTitle}</h1>
      <div>{elements}</div>
    </div>
  );
}

export default SideCategory;
