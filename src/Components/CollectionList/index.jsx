import { useRef } from 'react';
import useCollection from '../../Hooks/useCollection';
import { CollectionItem } from '../CollectionItem';
import { ControlBar } from '../ControlBar';

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
          className="size-full overflow-y-auto overflow-x-hidden"
          onScroll={handleScroll}
        >
          <div className="pb-3">
            <ControlBar />
            <div
              className="size-full grid grid-cols-auto-fit-250 gap-3 pt-3 px-3"
              ref={collectionContainer}
            >
              {collection.map((e, i) => (
                <CollectionItem
                  key={i}
                  itemInfo={e.basic_information}
                  containerRef={collectionContainer}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {error && <div>oops :&#x28;</div>}
      {loading && <div>...loading</div>}
    </>
  );
};
