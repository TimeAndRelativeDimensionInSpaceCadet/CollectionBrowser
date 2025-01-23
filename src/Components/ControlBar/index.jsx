import { useMemo, useCallback } from 'react';
import { DebouncedInput } from '../DebouncedInput';

export const ControlBar = ({ className, onSearch }) => {
  const classes = useMemo(
    () =>
      'sticky w-full h-20 p-2 top-0 left-0 bg-slate-700 shadow-md shadow-slate-700/80 z-10'
        .concat(` ${className ?? ''}`)
        .trim(),
    [className]
  );

  const handleSearch = useCallback(
    query => {
      if (onSearch) onSearch(query);
    },
    [onSearch]
  );

  /* const handleSearch = e => {
    if (e.key === 'Enter') {
      onSearch(searchText);
    }
  }; */

  return (
    <div className={classes}>
      {onSearch && typeof onSearch == 'function' && (
        <DebouncedInput handleChange={handleSearch} />
      )}
    </div>
  );
};
