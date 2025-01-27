import { useState, useEffect, useCallback } from 'react';

export const useCollectionSearch = (externalCollection = null) => {
  const [collection, setCollection] = useState(externalCollection);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (externalCollection) setCollection(externalCollection);
  }, [externalCollection]);

  const getArtistsFromInfo = artists => artists.map(a => a.name).join('');

  const getGenresFromInfo = genres => genres.join('');

  const getSubGenresFromInfo = subGenres => subGenres.join('');

  const handleSearchResults = useCallback(
    query => {
      if (query === '') {
        setSearchResults(null);
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
