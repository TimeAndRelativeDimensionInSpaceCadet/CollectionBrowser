import { useCollectionSearch } from './useCollectionSearch';
import { useSort } from './useSortDirection';

export const useCollectionControls = collection => {
  const { searchResults, handleSearchResults } =
    useCollectionSearch(collection);
  const { sortableCollection, handleSearchToggle } = useSort(collection);

  return {
    controllableCollection: sortableCollection,
    searchResults,
    handleSearchResults,
    handleSearchToggle,
  };
};
