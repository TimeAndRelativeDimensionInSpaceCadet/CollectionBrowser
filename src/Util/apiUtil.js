export const BASE_URL = 'https://api.discogs.com';

const createUrl = (base, path) => `${base}${path}`;

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Authorization:
    'Discogs key=axDUlhdXQPElPALxAoEU, secret=xARcGhyrIjMhGpjNIKmCvHknIHPoNiFp',
};

export const makeCollectionRequest = (pageNumber = 1, sort = 'artist') => ({
  url: createUrl(
    BASE_URL,
    `/users/jabbrowocky/collection/folders/0/releases?sort=${sort}&page=${pageNumber}`
  ),
  options: {
    method: 'GET',
    headers: DEFAULT_HEADERS,
  },
});
