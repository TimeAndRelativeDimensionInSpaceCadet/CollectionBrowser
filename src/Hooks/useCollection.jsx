import { useMemo } from 'react';
import useApiResult from './useApiResult';
import { makeCollectionRequest } from '../Util/apiUtil';

const useCollection = () => {
  const collectionRequest = useMemo(() => makeCollectionRequest(), []);

  return useApiResult(collectionRequest);
};

export default useCollection;
