import React from 'react';

interface SelectOptionProps {
  type: boolean;
}

function SelectOptions({ ...props }: SelectOptionProps) {
  const selectOption = [
    'Netflix',
    'Prime Video',
    'Hbo',
    'Hulu',
    'Disney+',
    'Apple tv',
  ];

  const selectTypeOption = [
    'Action',
    'Comedy',
    'Science fiction',
    'Drama',
    'Thriller',
    'Western',
    'Horror',
    'Romance',
  ];

  const selectOptions = props.type
    ? selectTypeOption.map((option) => {
        return (
          <option value={option} key={option}>
            {option}
          </option>
        );
      })
    : selectOption.map((option) => {
        return (
          <option value={option} key={option}>
            {option}
          </option>
        );
      });
  return <>{selectOptions}</>;
}

export default SelectOptions;
