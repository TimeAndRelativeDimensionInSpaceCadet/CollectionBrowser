import { useState } from 'react';
import { ImageSkeleton } from '../Skeleton';

export const ImageWithSkeleton = props => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <>
      {loading && <ImageSkeleton />}
      <img className={loading && 'hidden'} {...props} onLoad={handleLoad} />
    </>
  );
};
