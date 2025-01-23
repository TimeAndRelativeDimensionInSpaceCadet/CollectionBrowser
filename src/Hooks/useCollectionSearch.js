import { useState, useEffect, useCallback } from 'react';

export const useCollectionSearch = (externalCollection = null) => {
  const [collection, setCollection] = useState(externalCollection);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (externalCollection) setCollection(externalCollection);
  }, [externalCollection]);

  const getArtistsFromInfo = artists =>
    artists.map(a => a.name.toLowerCase()).join('');

  const getGenresFromInfo = genres => genres.map(e => e.toLowerCase()).join('');

  const handleSearchResults = useCallback(
    query => {
      if (query === '') {
        setSearchResults(null);
        return;
      }
      if (collection) {
        const filteredCollection = collection.filter(
          ({ basic_information: info }) => {
            const { artists, title, genres } = info;
            const hasQuery = [
              getArtistsFromInfo(artists),
              getGenresFromInfo(genres),
              title.toLowerCase(),
            ].some(queryable => queryable.includes(query));

            return hasQuery;
          }
        );

        setSearchResults(filteredCollection);
      }
    },
    [collection]
  );

  return {
    searchResults,
    handleSearchResults,
  };
};
