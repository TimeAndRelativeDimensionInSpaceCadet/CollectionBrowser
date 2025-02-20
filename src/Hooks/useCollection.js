import { useState, useContext } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { makeCollectionRequest } from '../Util/apiUtil';

export const useCollection = () => {
  const [queryParams, setParams] = useState({
    page: 1,
    sortBy: 'artist',
  });

  const updateParams = sortBy => {
    setParams(prev => ({ ...prev, sortBy }));
  };

  const fetchRecords = async ({ queryKey }) => {
    const [, { page, sortBy }] = queryKey;
    const { url, options } = makeCollectionRequest(page, sortBy);

    return await fetch(url, options).then(async response => {
      if (response.ok) {
        return await response.json();
      }
      return new Error(response?.statusText ?? '');
    });
  };

  const getPageArray = pageData => {
    const arr = [...Array(pageData?.pages + 1).keys()].slice(1);

    return arr;
  };

  const {
    data: initial,
    isFetching: isFetchingInitial,
    error: initialError,
  } = useQuery({
    queryKey: ['records', queryParams],
    queryFn: fetchRecords,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: collection,
    isFetchingQueries,
    error: collectionError,
  } = useQueries({
    queries:
      initial && !isFetchingInitial
        ? getPageArray(initial?.pagination).map(page => ({
            queryKey: ['records', { ...queryParams, page }],
            queryFn: fetchRecords,
            refetchOnWindowFocus: true,
            staleTime: 1000 * 60 * 5,
          }))
        : [],
    combine: results => {
      const combined = {
        data: results?.flatMap(result => result?.data?.releases ?? []),
        isFetchingQueries: results?.some(result => result?.isFetching ?? true),
        error: results?.some(result => result?.error ?? null),
      };
      return combined;
    },
  });

  return {
    collection,
    loading: isFetchingInitial || isFetchingQueries,
    error: initialError || collectionError,
    updateParams,
  };
};
