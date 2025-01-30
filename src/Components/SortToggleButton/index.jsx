import { useState } from 'react';
import { SortAscendingIcon, SortDescendingIcon } from '../../Icons';
import { useClassConcat } from '../../Hooks/useClassConcat';

export const sortDirections = {
  ascending: 'asc',
  descending: 'des',
};

export const SortToggleButton = ({ className, handleSortDirectionChange }) => {
  const [sortDirection, setSortDirection] = useState(sortDirections.ascending);
  const classes = useClassConcat('w-auto', className);

  const toggleSortDirection = () => {
    const { ascending, descending } = sortDirections;
    const nextDirection = sortDirection === ascending ? descending : ascending;
    setSortDirection(nextDirection);
    handleSortDirectionChange?.(nextDirection);
  };

  return (
    <div className={classes}>
      <button className="h-full p-3" onClick={toggleSortDirection}>
        {sortDirection === sortDirections.ascending && (
          <SortAscendingIcon className="fill-cyan-500 size-6" />
        )}
        {sortDirection === sortDirections.descending && (
          <SortDescendingIcon className="fill-cyan-500 size-6" />
        )}
      </button>
    </div>
  );
};
