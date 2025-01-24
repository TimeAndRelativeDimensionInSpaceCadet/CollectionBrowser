import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery, useQueries } from '@tanstack/react-query';
import { makeCollectionRequest } from '../Util/apiUtil';

const useCollection = () => {
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

export default useCollection;

export const useCollection2 = () => {
  const [loading, setIsLoading] = useState(false);

  const fetchRecords = pageNumber => async () => {
    const { url, options } = makeCollectionRequest(pageNumber);

    return await fetch(url, options).then(async response => {
      if (response.ok) {
        return await response.json();
      }
      return new Error(response?.statusText ?? '');
    });
  };

  const getPageArray = data => {
    const arr = [...Array((data?.pagination?.pages ?? 0) + 1).keys()].slice(1);
    //console.log(data, arr);
    return arr;
  };

  const { data: initial } = useQuery({
    queryKey: ['records2'],
    queryFn: fetchRecords(1),
    staleTime: Infinity,
  });

  const { data: records, pending } = useQueries({
    queries: initial
      ? getPageArray(initial).map(page => ({
          queryKey: ['records2', page],
          queryFn: fetchRecords(page),
          refetchOnWindowFocus: true,
          staleTime: 1000 * 60 * 5,
        }))
      : [{ queryKey: ['temp'], isPending: true }],
    combine: results => {
      const test = {
        data: results?.flatMap(page => page?.data?.releases),
        pending: results?.some(result => result.isPending),
      };
      return test;
    },
  });

  useEffect(() => {
    if (records && !pending) console.log(records);
  }, [records, pending]);

  return { initial, pending, records };
};
