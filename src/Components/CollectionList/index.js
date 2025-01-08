import useCollection from '../../Hooks/useCollection';

export const CollectionList = () => {
  const [collection, error] = useCollection();

  return (
    <div
      style={{
        width: '75%',
        maxWidth: '100%',
        display: 'grid',
        gridGap: '10px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      }}
    >
      {collection && !error ? (
        collection.releases.map((e, i) => (
          <img
            key={i}
            src={e.basic_information.cover_image}
            alt=""
            style={{ maxWidth: '100%' }}
          />
        ))
      ) : !error ? (
        <div>..loading</div>
      ) : (
        <div>oops</div>
      )}
    </div>
  );
};
