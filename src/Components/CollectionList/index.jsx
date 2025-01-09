import useCollection from '../../Hooks/useCollection';
import { CollectionItem } from '../CollectionItem';

export const CollectionList = () => {
  const [collection, loading, error] = useCollection();
  return (
    <>
      {collection && !error && (
        <div
          style={{
            padding: '0 10px',
            maxWidth: '75%',
            display: 'grid',
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '100vh',
            gridGap: '10px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridAutoRows: 'minmax(250px, 1fr)',
          }}
        >
          {collection.releases.map((e, i) => (
            <CollectionItem key={i} itemInfo={e.basic_information} />
          ))}
        </div>
      )}
      {error && <div>oops :&#x28;</div>}
      {loading && <div>...loading</div>}
    </>
  );
};
