import { useRef } from 'react';
import useCollection from '../../Hooks/useCollection';
import { CollectionItem } from '../CollectionItem';
import './CollectionList.css';

export const CollectionList = () => {
  const [collection, loading, error] = useCollection();
  const collectionContainer = useRef(null);

  return (
    <>
      {collection && !error && (
        <>
          {/* <button onClick={() => collection && 
            collection.sort((e, a) => e.title > a.title ? 1 : -1)}>Sort By Title</button> */}
          <div className="collection-container" ref={collectionContainer}>
            {collection.map((e, i) => (
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
      {loading && <div>...loading</div>}
    </>
  );
};
