import { useMemo, useState, useCallback, useRef } from 'react';

export const SortBySelectInput = ({ sortOptions, onSortByChange }) => {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [open, setOpen] = useState(false);
  const arrow = useRef(null);
  const dropDown = useRef(null);

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
    [handleSortByChange, setOpen]
  );

  const options = useMemo(() => {
    const mappedOptions = sortOptions?.map((option, index) => {
      const firstChar = option.slice(0, 1);
      const toDisplay = [
        ...option.replace(new RegExp('^\\w'), firstChar.toUpperCase()),
      ].join('');

      return (
        <div
          className="hover:bg-slate-600 p-2 hover:color:white"
          key={index}
          onClick={handleSelect(option)}
        >
          {toDisplay}
        </div>
      );
    });
    return mappedOptions;
  }, [sortOptions, handleSelect]);

  const handleClick = () => {
    const { current: arr } = arrow;

    !arr.classList.contains('transform-flip')
      ? arr.classList.add('transform-flip')
      : arr.classList.remove('transform-flip');
    setOpen(prev => !prev);
  };

  return (
    <div className="self-center w-auto relative">
      <div
        className="w-full h-full flex rounded-md cursor-pointer"
        onClick={handleClick}
      >
        <div className="absolute right-0 top-0 p-3 h-full">
          <svg
            ref={arrow}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 transition-all"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>

        <div className="h-full w-full pl-3 pt-3 pb-3 pr-12 bg-[#242424] rounded-md select-none">
          {selectedSort}
        </div>
      </div>
      <div
        className={`${
          !open ? 'hidden' : ''
        } absolute top-full right-0 bg-[#242424] w-full`}
        ref={dropDown}
      >
        {options}
      </div>
    </div>
  );
};
