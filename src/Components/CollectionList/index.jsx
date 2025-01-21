import { useRef } from 'react';
import useCollection from '../../Hooks/useCollection';
import { CollectionItem } from '../CollectionItem';

export const CollectionList = () => {
  const {
    collection,
    loading,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
  } = useCollection();
  const collectionContainer = useRef(null);

  const handleScroll = async ({ target: container }) => {
    if (
      Math.ceil(container.scrollHeight - container.scrollTop) ===
        container.clientHeight &&
      hasNextPage
    ) {
      !isFetchingNextPage && (await fetchNextPage());
    }
  };

  return (
    <>
      {collection && !error && (
        <div
          className="collection-container size-full grid grid-cols-auto-fit-250 gap-3 overflow-y-auto overflow-x-hidden p-3"
          ref={collectionContainer}
          onScroll={handleScroll}
        >
          {collection.map((e, i) => (
            <CollectionItem
              key={i}
              itemInfo={e.basic_information}
              containerRef={collectionContainer}
            />
          ))}
        </div>
      )}
      {error && <div>oops :&#x28;</div>}
      {loading && <div>...loading</div>}
    </>
  );
};
