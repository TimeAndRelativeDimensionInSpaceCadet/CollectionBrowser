import { useState, useCallback } from 'react';
import { useClassConcat } from '../../Hooks/useClassConcat';
import { debounce } from '../../Util/debounce';

export const DebouncedInput = ({
  className,
  placeholder,
  handleChange,
  debounceTimer = 500,
}) => {
  const [searchText, setSearchText] = useState('');
  const classNames = useClassConcat(
    'transition-all w-[15ch] focus-within:w-ch-20 relative',
    className
  );

  const handleDebouncedSearch = useCallback(
    debounce(handleChange, debounceTimer),
    [handleChange, debounceTimer]
  );

  const handleTextChange = ({ target: { value } }) => {
    setSearchText(value);
    handleDebouncedSearch(value);
  };

  return (
    <div className={classNames}>
      <div className="absolute flex items-center h-full px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <input
        id="debounced-input"
        className="max-w-full pl-12 pb-3 pt-3 pr-3 rounded-md"
        type="text"
        value={searchText}
        placeholder={placeholder}
        onChange={handleTextChange}
      />
    </div>
  );
};
