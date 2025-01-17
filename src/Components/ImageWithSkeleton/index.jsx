import { useState } from 'react';
import { ImageSkeleton } from '../Skeleton';

export const ImageWithSkeleton = ({ className, ...props }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <>
      {loading && <ImageSkeleton />}
      <img
        className={className.concat(loading ? ' hidden' : '')}
        {...props}
        onLoad={handleLoad}
      />
    </>
  );
};
