export const BASE_URL = 'https://api.discogs.com';

const createUrl = (base, path) => `${base}${path}`;

export const makeCollectionRequest = () => [
  createUrl(BASE_URL, '/users/jabbrowocky/collection/folders/0/releases?sort=artist'),
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Discogs key=axDUlhdXQPElPALxAoEU, secret=xARcGhyrIjMhGpjNIKmCvHknIHPoNiFp',
    },
  },
];
