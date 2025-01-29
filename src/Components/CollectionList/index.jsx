import { useRef, useCallback, useMemo } from 'react';
import { useCollection } from '../../Hooks/useCollection';
import { useCollectionControls } from '../../Hooks/useCollectionControls';
import { CollectionItem } from '../CollectionItem';
import { ControlBar } from '../ControlBar';
import { LoadingSpinner } from '../LoadingSpinner';

export const CollectionList = () => {
  const { collection, loading, error, updateParams } = useCollection('artist');
  const collectionContainer = useRef(null);

  const {
    controllableCollection,
    searchResults,
    handleSearchResults,
    handleSearchToggle,
  } = useCollectionControls(collection);

  const handleCollectionItemMap = useMemo(() => {
    return controllableCollection
      ?.filter(({ id }) => {
        return searchResults?.some(e => e.id === id) ?? true;
      })
      ?.map(({ id, basic_information }) => (
        <CollectionItem
          key={id}
          itemInfo={basic_information}
          containerRef={collectionContainer}
        />
      ));
  }, [controllableCollection, searchResults]);

  return (
    <>
      {collection && !error && !loading && (
        <div className="size-full overflow-y-auto overflow-x-hidden">
          <div className="pb-3">
            <ControlBar
              onSearch={handleSearchResults}
              onSortDirectionChange={handleSearchToggle}
              onSortByChange={updateParams}
            />
            <div
              className="size-full grid grid-cols-auto-fit-250 gap-3 pt-3 px-3"
              ref={collectionContainer}
            >
              {handleCollectionItemMap}
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
