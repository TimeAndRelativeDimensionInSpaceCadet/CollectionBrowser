import { useState, useEffect } from 'react';
import { ImageSkeleton } from '../Skeleton';

export const ImageWithSkeleton = ({ src }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.onload = () => setTimeout(() => setImage(img), 500);
      img.src = src;
    }
  }, [src]);

  return (
    <>{!image ? <ImageSkeleton /> : <img src={image.src} alt="cover-art" />}</>
  );
};
