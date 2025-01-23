import { useRef, useMemo } from 'react';
import useCollection from '../../Hooks/useCollection';
import { useCollectionSearch } from '../../Hooks/useCollectionSearch';
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

  const { searchResults, handleSearchResults } =
    useCollectionSearch(collection);

  const handleScroll = async ({ target: container }) => {
    if (
      Math.ceil(container.scrollHeight - container.scrollTop) ===
        container.clientHeight &&
      hasNextPage
    ) {
      !isFetchingNextPage && (await fetchNextPage());
    }
  };

  const handleCollectionItemMap = useMemo(() => {
    const toUse =
      searchResults
        ? searchResults
        : collection;

    return toUse?.map((e, i) => (
      <CollectionItem
        key={i}
        itemInfo={e.basic_information}
        containerRef={collectionContainer}
      />
    ));
  }, [collection, searchResults]);

  return (
    <>
      {collection && !error && (
        <div
          className="size-full overflow-y-auto overflow-x-hidden"
          onScroll={handleScroll}
        >
          <div className="px-1 pb-3">
            <ControlBar onSearch={handleSearchResults} />
            <div
              className="size-full grid grid-cols-auto-fit-250 gap-3 pt-3 px-2"
              ref={collectionContainer}
            >
              {handleCollectionItemMap}
            </div>
          </div>
        </div>
      )}
      {error && <div>oops :&#x28;</div>}
      {loading && <div>...loading</div>}
    </>
  );
};
