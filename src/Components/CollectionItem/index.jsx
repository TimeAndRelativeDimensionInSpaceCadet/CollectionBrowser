import { useRef, useMemo } from 'react';
import { ImageWithSkeleton } from '../ImageWithSkeleton';

export const CollectionItem = ({ itemInfo, containerRef = null }) => {
  const card = useRef(null);

  const handleClick = () => {
    const { current: item } = card;

    updateFlippedSibling(item);

    item.classList.contains('flipped')
      ? item.classList.remove('flipped')
      : item.classList.add('flipped');
  };

  const updateFlippedSibling = currentItem => {
    const { current: container } = containerRef;

    if (container) {
      [...container.children].forEach(element => {
        element.classList.contains('flipped') &&
          element !== currentItem &&
          element.classList.remove('flipped');
      });
    }
  };

  const formatArtist = useMemo(
    () =>
      itemInfo.artists
        .map(e => e.name.replace(new RegExp(/\W?\(\d+\)/g), ''))
        .join(', '),
    [itemInfo]
  );

  const formatGenres = () => itemInfo.genres.join(', ');

  return (
    <div
      className="relative aspect-square perspective-far cursor-pointer all-descendents:rounded-md"
      ref={card}
      onClick={handleClick}
    >
      <div className="relative size-full transition-transform duration-700 transform-style-3d children:size-full children:absolute children:backface-hidden">
        <ImageWithSkeleton src={itemInfo.cover_image} alt="album cover art" />
        <div className="p-4 transform-flip-y bg-slate-500 text-white flex flex-col justify-between antialiased">
          <div>
            <div className="text-xl break-words font-semibold">
              {itemInfo.title}
            </div>
            <div class="my-2">by</div>
            {formatArtist}
          </div>
          <div class="pb-8">{formatGenres()}</div>
        </div>
      </div>
    </div>
  );
};
