import { useRef, useMemo } from 'react';
import useCollection from '../../Hooks/useCollection';
import { CollectionItem } from '../CollectionItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import './CollectionList.css';
import { makeCollectionRequest } from '../../Util/apiUtil';

export const CollectionList = () => {
  //const [collection, loading, error] = useCollection();
  const collectionContainer = useRef(null);

  const { status, data, isFetching, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['records'],
      queryFn: async ({ pageParam }) => {
        const { url, options } = makeCollectionRequest(pageParam);
        return await fetch(url, options)
          .then(async response => {
            return await response.json();
          })
          .catch(err => {
            return err;
          });
      },
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        let currentPage = lastPage.pagination.page;

        return ++currentPage <= lastPage.pagination.pages
          ? currentPage
          : null
      },
    });

  const getCollection = useMemo(
    () => data?.pages.flatMap(e => e.releases),
    [data]
  );

  const handleScroll = ({ target: container }) => {
    if (
      Math.ceil(container.scrollHeight - container.scrollTop) ===
        container.clientHeight &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  };

  return (
    <>
      {data && !error && (
        <>
          <div
            className="collection-container"
            ref={collectionContainer}
            onScroll={handleScroll}
          >
            {getCollection.map((e, i) => (
              <CollectionItem
                key={i}
                itemInfo={e.basic_information}
                containerRef={collectionContainer}
              />
            ))}
          </div>
        </>
      )}
      {error && <div>oops :&#x28;</div>}
      {(status == 'pending' || isFetching) && <div>...loading</div>}
    </>
  );
};
