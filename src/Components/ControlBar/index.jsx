import { useCallback } from 'react';
import { useClassConcat } from '../../Hooks/useClassConcat';
import { DebouncedInput } from '../DebouncedInput';

export const ControlBar = ({ className, onSearch }) => {
  const classes = useClassConcat(
    'sticky flex flex-row-reverse w-full h-20 p-3 top-0 left-0 bg-slate-700 shadow-md shadow-slate-700/80 z-10',
    className
  );

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
    </div>
  );
};
