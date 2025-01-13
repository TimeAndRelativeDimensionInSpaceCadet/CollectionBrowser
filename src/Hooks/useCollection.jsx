import { useMemo, useEffect, useState } from 'react';
import useApiResult from './useApiResult';
import { makeCollectionRequest } from '../Util/apiUtil';
import { DEFAULT_HEADERS } from '../Util/apiUtil';

const useCollection = () => {
  const collectionRequest = useMemo(makeCollectionRequest, []);
  const [result, loading, error] = useApiResult(collectionRequest);

  const [isStillLoading, setIsStillLoading] = useState(loading);
  const [wholeCollection, setWholeCollection] = useState(null);
  const [hasError, setHasError] = useState(error);

  useEffect(() => {
    if (result) {
      setIsStillLoading(true);
      const pagesArr = Array(result.pagination.pages - 1).fill(0);
      Promise.all(
        pagesArr.map(_ =>
          fetch(result.pagination.urls.next, {
            headers: DEFAULT_HEADERS,
          })
            .then(async e => await e.json())
            .catch(e => setHasError(e.message))
        )
      ).then(e => {
        var wholeCollection = e.flatMap(response =>
          result.releases.concat(response.releases)
        );
        setWholeCollection(wholeCollection);
        setIsStillLoading(false);
      });
    }
  }, [result]);

  return [wholeCollection, isStillLoading, hasError ];
};

export default useCollection;
