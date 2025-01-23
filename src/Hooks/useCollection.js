import { useMemo, useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { makeCollectionRequest } from '../Util/apiUtil';

const useCollection = () => {
  const [collection, setCollection] = useState(null);
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
    initialPageParam: 1,
    getNextPageParam: getNextPageNumber,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
  });

  const getCollection = useMemo(
    () => data?.pages.flatMap(e => e.releases),
    [data]
  );

  useEffect(() => {
    if (getCollection) setCollection(getCollection);
  }, [getCollection]);

  useEffect(() => {
    setIsLoading(status === 'pending' || isFetching);
  }, [isFetching, status]);

  return {
    collection,
    loading,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
  };
};

export default useCollection;
