import { useRef, useEffect, useCallback } from 'react';
import './CollectionItem.css';

export const CollectionItem = ({ itemInfo }) => {
  const card = useRef(null);

  /* const handleOtherCardClicked = useCallback()
  useEffect(() => {

  }, []) */
  const handleClick = () => {
    const { current: item } = card;

    item.classList.contains('flipped')
      ? item.classList.remove('flipped')
      : item.classList.add('flipped');
  };

  return (
    <div className="flip-card" ref={card} onClick={handleClick}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={itemInfo.cover_image} alt="cover art" />
        </div>
        <div className="flip-card-back"></div>
      </div>
    </div>
  );
};
