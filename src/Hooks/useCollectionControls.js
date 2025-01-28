import { useCallback, useEffect, useState } from 'react';
import { useCollectionSearch } from './useCollectionSearch';

export const useCollectionControls = collection => {
  const [internalCollection, setInternalCollection] = useState(null);
  const { searchResults, handleSearchResults } =
    useCollectionSearch(internalCollection);

  const handleSearchToggle = useCallback(() => {
    setInternalCollection(internalCollection?.toReversed());
  }, [internalCollection]);

  useEffect(() => {
    if (collection) setInternalCollection(collection);
  }, [collection]);

  return {
    controllableCollection: internalCollection,
    searchResults,
    handleSearchResults,
    handleSearchToggle,
  };
};
