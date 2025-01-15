import { useRef } from 'react';
import './CollectionItem.css';

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

  const formatArtist = () =>
    itemInfo.artists
      .map(e => e.name.replace(new RegExp(/ \(\d+\)/gm), ''))
      .join(', ');

  const formatGenres = () => itemInfo.genres.join(', ');

  return (
    <div className="flip-card" ref={card} onClick={handleClick}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={itemInfo.cover_image} alt="cover art" />
        </div>
        <div className="flip-card-back">
          <div className="artist-header">{itemInfo.title}</div>
          <div>by</div>
          <em>{formatArtist()}</em>
          <div style={{ padding: '2rem 6px' }}>{formatGenres()}</div>
        </div>
      </div>
    </div>
  );
};
