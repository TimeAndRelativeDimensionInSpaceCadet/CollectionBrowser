import { useCallback, useState } from 'react';
import { useClassConcat } from '../../Hooks/useClassConcat';
import { SortToggleButton } from '../SortToggleButton';
import { DebouncedInput } from '../DebouncedInput';

export const ControlBar = ({
  className,
  onSearch,
  onSortDirectionChange,
  onSortByChange,
}) => {
  const classes = useClassConcat(
    'sticky flex flex-row-reverse w-full h-20 p-3 top-0 left-0 bg-slate-700 shadow-md shadow-slate-700/80 z-10',
    className
  );
  const [selectedSort, setSelectedSort] = useState('artist');

  const handleSortChange = useCallback(() => {
    onSortDirectionChange?.();
  }, [onSortDirectionChange]);

  const handleSearch = useCallback(
    query => {
      onSearch?.(query);
    },
    [onSearch]
  );

  const handleSortByChange = useCallback(e => {
    e.preventDefault();
    onSortByChange?.(e.target.value);

    setSelectedSort(e.target.value);
  }, []);

  return (
    <div className={classes}>
      {onSortDirectionChange && typeof onSortDirectionChange === 'function' && (
        <SortToggleButton
          className="self-center"
          handleSortDirectionChange={handleSortChange}
        />
      )}
      {onSortByChange && typeof onSortByChange === 'function' && (
        <div>
          <select onChange={handleSortByChange} value={selectedSort}>
            <option value="artist">Artist</option>
            <option value="title">Title</option>
          </select>
        </div>
      )}
      {onSearch && typeof onSearch === 'function' && (
        <DebouncedInput
          className="self-center"
          placeholder="Search"
          handleChange={handleSearch}
        />
      )}
    </div>
  );
};
