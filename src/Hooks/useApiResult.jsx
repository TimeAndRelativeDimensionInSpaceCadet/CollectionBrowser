import { useState, useEffect } from 'react';

const useApiResult = request => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    var [url, options] = request;
    fetch(url, options)
      .then(async response => {
        console.log('.then', request);
        if (response.ok) {
          setResults(await response.json());
          setError(null);
        } else {
          setError(await response.text());
        }
      })
      .catch(err => {
        setError(err.message);
      });
  }, [request]);

  return [results, error];
};

export default useApiResult;
