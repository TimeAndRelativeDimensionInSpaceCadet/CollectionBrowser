import { useState } from 'react';
import { ImageSkeleton } from '../Skeleton';
import { useClassConcat } from '../../Hooks/useClassConcat';

export const ImageWithSkeleton = ({ className, ...props }) => {
  const [loading, setLoading] = useState(true);
  const classes = useClassConcat(loading ? 'hidden' : '', className);

  const handleLoad = () => {
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <>
      {loading && <ImageSkeleton />}
      <img className={classes} {...props} onLoad={handleLoad} />
    </>
  );
};
