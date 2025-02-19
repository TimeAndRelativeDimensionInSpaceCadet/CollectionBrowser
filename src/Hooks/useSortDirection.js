import { useEffect, useCallback, useState } from 'react';
import { SortDirections } from '../Constants/SortDirections';

export const useSort = collection => {
  const [sortableCollection, setInternalCollection] = useState();
  const [sortDirection, setSortDirection] = useState(SortDirections.ascending);

  useEffect(() => {
    if (collection) setInternalCollection(collection);
  }, [collection]);

  const reverseCollection = useCallback(
    collection => {
      return sortDirection === SortDirections.descending
        ? collection.toReversed()
        : [...collection];
    },
    [sortDirection]
  );

  useEffect(() => {
    if (collection) setInternalCollection(reverseCollection);
  }, [reverseCollection, collection]);

  const handleSortToggle = useCallback(
    direction => {
      setSortDirection(direction);
      setInternalCollection(reverseCollection);
    },
    [reverseCollection]
  );

  return {
    sortableCollection,
    handleSortToggle,
  };
};
