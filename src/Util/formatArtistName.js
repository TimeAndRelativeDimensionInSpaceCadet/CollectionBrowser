import { useMemo } from 'react';

export const formatArtistName = itemInfo =>
  itemInfo.artists
    .map(e => e.name.replace(new RegExp(/\W?\(\d+\)/g), ''))
    .join(', ');
