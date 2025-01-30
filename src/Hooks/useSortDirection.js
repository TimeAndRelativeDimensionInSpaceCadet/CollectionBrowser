import { useEffect, useCallback, useState } from 'react';
import { sortDirections } from '../Components/SortToggleButton';

export const useSortDirection = collection => {
  const [sortableCollection, setInternalCollection] = useState(collection);
  const [sortDirection, setSortDirection] = useState(sortDirections.ascending);

  useEffect(() => {
    if (collection) setInternalCollection(collection);
  }, [collection]);

   useEffect(() => {
    if (collection)
      setInternalCollection(prev => {
        return sortDirection === sortDirections.descending
          ? prev.toReversed()
          : [...prev];
      });
  }, [collection]);

  const handleSearchToggle = useCallback(
    direction => {
      setSortDirection(direction);
      setInternalCollection(prev => prev.toReversed());
    },
    [sortableCollection]
  );

  return {
    sortableCollection,
    handleSearchToggle,
  };
};
