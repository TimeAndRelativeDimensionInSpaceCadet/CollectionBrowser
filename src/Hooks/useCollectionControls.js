import { useCollectionSearch } from './useCollectionSearch';
import { useSort } from './useSortDirection';

export const useCollectionControls = collection => {
  const { searchResults, handleSearchResults } =
    useCollectionSearch(collection);
  const { sortableCollection, handleSortToggle } = useSort(collection);

  return {
    controllableCollection: sortableCollection,
    searchResults,
    handleSearchResults,
    handleSortToggle,
  };
};
