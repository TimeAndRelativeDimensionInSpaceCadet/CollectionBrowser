import { useState, useMemo } from 'react';

export const ControlBar = ({ className, onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const classes = useMemo(
    () =>
      'sticky w-full h-20 p-2 top-0 left-0 bg-slate-700 shadow-md shadow-slate-700/80 z-10'
        .concat(` ${className ?? ''}`)
        .trim(),
    [className]
  );

  const handleTextChange = e => setSearchText(e.target.value);

  const handleSearch = e => {
    if (e.key === 'Enter') {
      onSearch(searchText);
    }
  };

  const handleInputFocus = e => {
    e.target.classList.add('');
  };

  const handleInputBlur = e => {
    e.target.classList.remove('')
  };

  return (
    <div className={classes}>
      {onSearch && typeof onSearch == 'function' && (
        <div>
          <input
            type="text"
            placeholder="Search"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleTextChange}
            onKeyDown={handleSearch}
          />
          <button onClick={() => onSearch(searchText)}>Search</button>
        </div>
      )}
    </div>
  );
};
