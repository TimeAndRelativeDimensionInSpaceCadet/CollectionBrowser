import { useMemo, useState, useCallback } from 'react';

export const SortBySelectInput = ({ sortOptions, onSortByChange }) => {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  const handleSortByChange = useCallback(
    ({ target }) => {
      const { value } = target;
      setSelectedSort(value);
      onSortByChange?.(value);
    },
    [onSortByChange]
  );

  const options = useMemo(() => {
    const mappedOptions = sortOptions?.map((option, index) => {
      const firstChar = option.slice(0, 1);
      const toDisplay = [
        ...option.replace(firstChar, firstChar.toUpperCase()),
      ].join('');

      return (
        <option key={index} value={option}>
          {toDisplay}
        </option>
      );
    });
    return mappedOptions;
  }, [sortOptions]);

  return (
    <div>
      <select onChange={handleSortByChange} value={selectedSort}>
        {options}
      </select>
    </div>
  );
};
