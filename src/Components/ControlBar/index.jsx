import { useCallback, useRef } from 'react';
import { useClassConcat } from '../../Hooks/useClassConcat';
import { SortToggleButton } from '../SortToggleButton';
import { DebouncedInput } from '../DebouncedInput';
import { SortBySelectInput } from '../SortBySelectInput';

export const ControlBar = ({
  className,
  onSearch,
  onSortDirectionChange,
  onSortByChange,
}) => {
  const { current: sortOptions } = useRef(['artist', 'title', 'year']);
  const classes = useClassConcat(
    'sticky flex flex-row-reverse w-full h-20 p-3 top-0 left-0 bg-slate-700 shadow-md shadow-slate-700/80 z-10',
    className
  );

  const handleSortChange = useCallback(
    direction => {
      onSortDirectionChange?.(direction);
    },
    [onSortDirectionChange]
  );

  const handleSearch = useCallback(
    query => {
      onSearch?.(query);
    },
    [onSearch]
  );

  const handleSortByChange = useCallback(
    value => {
      onSortByChange?.(value);
    },
    [onSortByChange]
  );

  return (
    <div className={classes}>
      {onSortDirectionChange && typeof onSortDirectionChange === 'function' && (
        <SortToggleButton
          className="self-center"
          handleSortDirectionChange={handleSortChange}
        />
      )}
      {onSortByChange && typeof onSortByChange === 'function' && (
        <SortBySelectInput
          className="self-center mr-2"
          sortOptions={sortOptions}
          onSortByChange={handleSortByChange}
        />
      )}
      {onSearch && typeof onSearch === 'function' && (
        <DebouncedInput
          className="mr-2 self-center"
          placeholder="Search"
          handleChange={handleSearch}
        />
      )}
    </div>
  );
};
