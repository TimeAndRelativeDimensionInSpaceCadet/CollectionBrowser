import { useMemo, useState, useCallback } from 'react';

export const SortBySelectInput = ({ sortOptions, onSortByChange }) => {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [open, setOpen] = useState(false);

  const handleSortByChange = useCallback(
    value => {
      setSelectedSort(value);
      onSortByChange?.(value);
      handleClick();
    },
    [onSortByChange]
  );

  const handleSelect = useCallback(
    option => () => {
      handleSortByChange(option);
    },
    [handleSortByChange]
  );

  const options = useMemo(() => {
    const mappedOptions = sortOptions?.map((option, index) => {
      return (
        <div
          className={`${
            selectedSort == option ? 'bg-slate-600 ' : 'hover:bg-slate-600 '
          }p-2 cursor-pointer select-none`}
          key={index}
          onClick={handleSelect(option)}
        >
          {option.toTitleCase()}
        </div>
      );
    });
    return mappedOptions;
  }, [sortOptions, selectedSort, handleSelect]);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  return (
    <div className={`self-center w-auto relative`}>
      <div
        className="w-full h-full flex rounded-md cursor-pointer"
        onClick={handleClick}
      >
        <div className="absolute right-0 top-0 p-3 h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${!open ? '' : 'transform-flip'} size-6 transition-all`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        <div className="h-full w-full pl-3 pt-3 pb-3 pr-12 rounded-md  dark-theme-bg select-none">
          {selectedSort.toTitleCase()}
        </div>
      </div>
      <div
        aria-hidden={!open}
        className={`${
          !open ? 'hidden' : ''
        } absolute top-full right-0  dark-theme-bg w-full rounded-md`}
      >
        {options}
      </div>
    </div>
  );
};
