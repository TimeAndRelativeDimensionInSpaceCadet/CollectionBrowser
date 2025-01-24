import { useMemo } from 'react';
export const useClassConcat = (internalClasses, externalClasses) => {
  return useMemo(
    () => internalClasses.concat(` ${externalClasses ?? ''}`).trim(),
    [internalClasses, externalClasses]
  );
};
