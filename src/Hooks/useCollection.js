import { useEffect, useState, useCallback } from 'react';
import { useInfiniteQuery, useQuery, useQueries } from '@tanstack/react-query';
import { makeCollectionRequest } from '../Util/apiUtil';

export const useCollection = sortBy => {
  const [loading, setIsLoading] = useState(false);
  const [queryParams, setParams] = useState({ page: 1, sortBy });

  const updateParams = sortBy => {
    setParams(prev => ({ ...prev, sortBy }));
  };

  const fetchRecords = async ({ queryKey }) => {
    const [_key, { page, sortBy }] = queryKey;
    const { url, options } = makeCollectionRequest(page, sortBy);

    return await fetch(url, options).then(async response => {
      if (response.ok) {
        return await response.json();
      }
      return new Error(response?.statusText ?? '');
    });
  };

  const getPageArray = pageData => {
    const arr = [...Array((pageData?.pages ?? 0) + 1).keys()].slice(1);

    return arr;
  };

  const {
    data: initial,
    isFetching: isFetchingInitial,
    pending: isInitialPending,
    error: initialError,
  } = useQuery({
    queryKey: ['records', queryParams],
    queryFn: fetchRecords,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: collection,
    pending,
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
        pending: results?.some(result => result?.isFetching ?? true),
        error: results?.some(result => result?.error ?? null),
      };
      return combined;
    },
  });

  useEffect(() => {
    setIsLoading(pending || isFetchingInitial);
  }, [pending, isFetchingInitial]);

  return {
    collection,
    loading,
    error: initialError || collectionError,
    updateParams,
  };
};

export const useInfiniteCollection = () => {
  const [loading, setIsLoading] = useState(false);

  const fetchRecords = async ({ pageParam }) => {
    const { url, options } = makeCollectionRequest(pageParam);

    return await fetch(url, options).then(async response => {
      if (response.ok) {
        return await response.json();
      }
      return new Error(response?.statusText ?? '');
    });
  };

  const getNextPageNumber = lastPage => {
    let { page: currentPage = 0, pages = 0 } = lastPage?.pagination;

    return ++currentPage <= pages ? currentPage : null;
  };

  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['records'],
    queryFn: fetchRecords,
    select: data => {
      return data?.pages.flatMap(e => e.releases);
    },
    initialPageParam: 1,
    getNextPageParam: getNextPageNumber,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setIsLoading(status === 'pending' || isFetching);
  }, [isFetching, status]);

  return {
    collection: data,
    loading,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
  };
};
