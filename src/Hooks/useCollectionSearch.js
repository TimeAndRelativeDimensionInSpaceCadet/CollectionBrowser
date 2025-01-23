import { useState, useEffect, useCallback } from 'react';

export const useCollectionSearch = (externalCollection = null) => {
  const [collection, setCollection] = useState(externalCollection);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (externalCollection) setCollection(externalCollection);
  }, [externalCollection]);

  const handleSearchResults = useCallback(
    query => {
      if (collection) {
        const filteredCollection = collection.filter(e => {
          const artists = e.basic_information.artists
            .map(a => a.name.toLowerCase())
            .join('');
          const hasQuery = artists.includes(query);
          return hasQuery;
        });

        setSearchResults(filteredCollection);
      }
    },
    [collection]
  );

  const clearSearchResults = () => setSearchResults(null);

  return {
    searchResults,
    handleSearchResults,
    clearSearchResults,
  };
};
