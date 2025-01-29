import { useEffect, useCallback, useState } from 'react';

export const useSortDirection = collection => {
  const [sortableCollection, setInternalCollection] = useState(collection);

  useEffect(() => {
    if (collection) setInternalCollection(collection);
  }, [collection]);

  const handleSearchToggle = useCallback(() => {
    setInternalCollection(prev => prev.toReversed());
  }, [sortableCollection]);

  return {
    sortableCollection,
    handleSearchToggle,
  };
};
