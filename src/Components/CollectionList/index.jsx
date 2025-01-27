import { useCallback, useMemo, useRef } from 'react';
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

  const handleCollectionItemMap = toUse => {
    return toUse?.map(({ basic_information }) => (
      <CollectionItem
        key={basic_information.title}
        itemInfo={basic_information}
        containerRef={collectionContainer}
      />
    ));
  };

  return (
    <>
      {collection && !error && !loading && (
        <div className="size-full overflow-y-auto overflow-x-hidden">
          <div className="pb-3">
            <ControlBar onSearch={handleSearchResults} />
            <div
              className="size-full grid grid-cols-auto-fit-250 gap-3 pt-3 px-3"
              ref={collectionContainer}
            >
              {handleCollectionItemMap(
                searchResults ? searchResults : collection
              )}
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
