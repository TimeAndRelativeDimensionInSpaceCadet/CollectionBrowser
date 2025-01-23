import { useState, useMemo, useCallback } from 'react';
import { debounce } from '../../Util/debounce';

export const DebouncedInput = ({ handleChange }) => {
  const [searchText, setSearchText] = useState('');

  const handleDebouncedSearch = useMemo(() => {
    return debounce(handleChange, 500);
  }, [handleChange]);

  const handleTextChange = ({ target: { value } }) => {
    setSearchText(value);
    handleDebouncedSearch(value);
  };
  return (
    <div className="p-2">
      <div></div>
      <input
        type="text"
        value={searchText}
        placeholder="Search"
        onChange={handleTextChange}
      />
    </div>
  );
};
