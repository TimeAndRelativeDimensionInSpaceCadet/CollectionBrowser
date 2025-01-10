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
      Array.from(container.children).forEach(element => {
        element.classList.contains('flipped') &&
          element !== currentItem &&
          element.classList.remove('flipped');
      });
    }
  };

  const formatArtist = () => itemInfo.artists.map(e => e.name).join(' and ');

  const formatGenres = () => itemInfo.genres.join(', ');

  return (
    <div className="flip-card" ref={card} onClick={handleClick}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={itemInfo.cover_image} alt="cover art" />
        </div>
        <div className="flip-card-back">
          <div style={{ padding: '10px 4px', fontSize: '1.25rem', fontWeight: 'bolder' }}>{itemInfo.title}</div>
          <div style={{ padding: '4px' }}>by</div>
          <div style={{ padding: '4px', fontStyle: 'italic' }}>{formatArtist()}</div>
          <div style={{ padding: '2rem 0', marginTop: 'auto'}}>{formatGenres()}</div>
        </div>
      </div>
    </div>
  );
};
