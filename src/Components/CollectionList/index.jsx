import { useRef } from 'react';
import { useCollection } from '../../Hooks/useCollection';
import { useCollectionSearch } from '../../Hooks/useCollectionSearch';
import { CollectionItem } from '../CollectionItem';
import { ControlBar } from '../ControlBar';
import { LoadingSpinner } from '../LoadingSpinner';

export const CollectionList = () => {
  const { collection, loading, error } = useCollection();
  const collectionContainer = useRef(null);

  const { searchResults, handleSearchResults } =
    useCollectionSearch(collection);

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
      {collection && !error && !loading && (
        <div
          className="size-full overflow-y-auto overflow-x-hidden"
          //onScroll={handleScroll}
        >
          <div className="pb-3">
            <ControlBar onSearch={handleSearchResults} />
            <div
              className="size-full grid grid-cols-auto-fit-250 gap-3 pt-3 px-3"
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
