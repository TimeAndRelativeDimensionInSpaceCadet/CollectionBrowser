import { useRef, useMemo } from 'react';
import { useCollection } from '../../Hooks/useCollection';
import { useCollectionControls } from '../../Hooks/useCollectionControls';
import { CollectionItem } from '../CollectionItem';
import { ControlBar } from '../ControlBar';
import { LoadingSpinner } from '../LoadingSpinner';

export const CollectionList = () => {
  const { collection, loading, error, updateParams } = useCollection('artist');
  const collectionContainer = useRef(null);
  const drawerRef = useRef(null);

  const {
    controllableCollection,
    searchResults,
    handleSearchResults,
    handleSortToggle,
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
      {collection && !error && (
        <div className="size-full overflow-hidden flex flex-col">
          <ControlBar
            drawerContainerRef={drawerRef}
            onSearch={handleSearchResults}
            onSortDirectionChange={handleSortToggle}
            onSortByChange={updateParams}
          />
          <div ref={drawerRef} className="relative flex-1 overflow-hidden">
            {!loading && (
              <div
                className="overflow-y-auto max-h-full grid grid-cols-auto-fit-250 gap-3 p-3"
                ref={collectionContainer}
              >
                {handleCollectionItemMap}
              </div>
            )}
            {loading && (
              <div className="size-full flex items-center justify-center">
                <LoadingSpinner className="stroke-cyan-500 fill-cyan-500 max-h-16" />
              </div>
            )}
          </div>
        </div>
      )}
      {error && <div>oops :&#x28;</div>}
    </>
  );
};
