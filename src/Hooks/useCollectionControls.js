import { useState } from 'react';
import { useCollectionSearch } from './useCollectionSearch';
import { useSortDirection } from './useSortDirection';

export const useCollectionControls = collection => {
  const { searchResults, handleSearchResults } =
    useCollectionSearch(collection);
  const { sortableCollection, handleSearchToggle } =
    useSortDirection(collection);
    const [ sortBy, setSortBy ] = useState('artist');

    
  return {
    controllableCollection: sortableCollection,
    searchResults,
    handleSearchResults,
    handleSearchToggle,
    setSortBy
  };
};
