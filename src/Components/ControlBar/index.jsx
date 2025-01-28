import { useCallback, useState } from 'react';
import { useClassConcat } from '../../Hooks/useClassConcat';
import { DebouncedInput } from '../DebouncedInput';

const sortDirections = {
  ascending: 'asc',
  descending: 'des',
};

export const ControlBar = ({ className, onSearch, onSortDirectionChange }) => {
  const classes = useClassConcat(
    'sticky flex flex-row-reverse w-full h-20 p-3 top-0 left-0 bg-slate-700 shadow-md shadow-slate-700/80 z-10',
    className
  );

  const [sortDirection, setSortDirection] = useState(sortDirections.ascending);

  const toggleSortDirection = () => {
    const { ascending, descending } = sortDirections;
    sortDirection === ascending
      ? setSortDirection(descending)
      : setSortDirection(ascending);

    onSortDirectionChange?.();
  };

  const handleSearch = useCallback(
    query => {
      onSearch?.(query);
    },
    [onSearch]
  );

  return (
    <div className={classes}>
      {onSearch && typeof onSearch == 'function' && (
        <DebouncedInput
          className="self-center"
          placeholder="Search"
          handleChange={handleSearch}
        />
      )}
      <div className="self-center w-auto">
        <button className="h-full p-3" onClick={toggleSortDirection}>
          <SortAscendingIcon className="fill-cyan-500 size-6" />
        </button>
      </div>
    </div>
  );
};

const SortAscendingIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M19 17H22L18 21L14 17H17V3H19M2 17H12V19H2M6 5V7H2V5M2 11H9V13H2V11Z" />
  </svg>
);
