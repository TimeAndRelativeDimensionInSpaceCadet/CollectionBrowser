import { useCallback } from 'react';
import { useCollectionSearch } from './useCollectionSearch';
import { useSort } from './useSortDirection';

export const useCollectionControls = collection => {
  const { searchResults, handleSearchResults } =
    useCollectionSearch(collection);
  const { sortableCollection, handleSortToggle } = useSort(collection);

  const handleGenerateRandom = useCallback(() => {
    const index = Math.floor(Math.random() * collection.length);

    console.log([...collection][index]);

    return [...collection][index];
  }, [collection]);

  return {
    controllableCollection: sortableCollection,
    searchResults,
    handleSearchResults,
    handleSortToggle,
    handleGenerateRandom,
  };
};
