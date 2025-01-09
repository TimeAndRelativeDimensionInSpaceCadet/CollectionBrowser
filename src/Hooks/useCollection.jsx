import { useMemo, useEffect } from 'react';
import useApiResult from './useApiResult';
import { makeCollectionRequest } from '../Util/apiUtil';

const useCollection = () => {
  const collectionRequest = useMemo(makeCollectionRequest, []);
  //const [ result, error ] = useApiResult(collectionRequest);

  return useApiResult(collectionRequest);
};

export default useCollection;
