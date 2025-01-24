import { useRef } from 'react';
import useCollection, { useCollection2 } from '../../Hooks/useCollection';
import { useCollectionSearch } from '../../Hooks/useCollectionSearch';
import { CollectionItem } from '../CollectionItem';
import { ControlBar } from '../ControlBar';
import { LoadingSpinner } from '../LoadingSpinner';

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

  const test = useCollection2();

  const handleScroll = async ({ target: container }) => {
    if (
      Math.ceil(container.scrollHeight - container.scrollTop) ===
        container.clientHeight &&
      hasNextPage
    ) {
      !isFetchingNextPage && (await fetchNextPage());
    }
  };

  const handleCollectionItemMap = () => {
    const toUse = searchResults ? searchResults : collection;

    return toUse?.map((e, i) => (
      <CollectionItem
        key={i}
        itemInfo={e.basic_information}
        containerRef={collectionContainer}
      />
    ));
  };

  return (
    <>
      {collection && !error && (
        <div
          className="size-full overflow-y-auto overflow-x-hidden"
          //onScroll={handleScroll}
        >
          <div className="px-1 pb-3">
            <ControlBar onSearch={handleSearchResults} />
            <div
              className="size-full grid grid-cols-auto-fit-250 gap-3 pt-3 px-2"
              ref={collectionContainer}
            >
              {handleCollectionItemMap()}
            </div>
          </div>
        </div>
      )}
      {error && <div>oops :&#x28;</div>}
      {loading && (
        <div className="max-h-16">
          <LoadingSpinner className="stroke-cyan-500 fill-cyan-500 h-full w-full" />
        </div>
      )}
    </>
  );
};
