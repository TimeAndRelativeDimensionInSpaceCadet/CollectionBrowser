import { useState, useEffect, useCallback } from 'react';

export const useCollectionSearch = (externalCollection = null) => {
  const [collection, setCollection] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [currentQuery, setCurrentQuery] = useState(null);

  useEffect(() => {
    if (externalCollection) setCollection(externalCollection);
  }, [externalCollection]);

  useEffect(() => {
    if (currentQuery) handleSearchResults(currentQuery);
  }, [collection, currentQuery]);

  const getArtistsFromInfo = artists => artists.map(a => a.name).join('');

  const getGenresFromInfo = genres => genres.join('');

  const getSubGenresFromInfo = subGenres => subGenres.join('');

  const handleSearchResults = useCallback(
    query => {
      if (query === '') {
        setSearchResults(null);
        setCurrentQuery(null);
        return;
      }
      if (collection) {
        const filteredCollection = collection.filter(
          ({ basic_information: info }) => {
            const { artists, title, genres, styles } = info;
            const hasQuery = [
              getArtistsFromInfo(artists),
              getGenresFromInfo(genres),
              getSubGenresFromInfo(styles),
              title,
            ].some(queryable =>
              queryable.toLowerCase().includes(query.toLowerCase())
            );

            return hasQuery;
          }
        );
        setCurrentQuery(query);
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
