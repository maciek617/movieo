import React from 'react';

function SelectOptions() {
  const selectOption = [
    'Netflix',
    'Prime Video',
    'HBO',
    'Hulu',
    'Disney+',
    'Apple TV',
  ];

  const selectOptions = selectOption.map((option) => {
    return (
      <option value={option} key={option}>
        {option}
      </option>
    );
  });
  return <>{selectOptions}</>;
}

export default SelectOptions;
