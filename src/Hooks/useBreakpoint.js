import { useEffect, useState, useCallback } from 'react';

export const QueryType = {
  LessThan: (a, b) => a < b,
  GreaterThan: (a, b) => a > b,
  LessThanEqualTo: (a, b) => a <= b,
  GreaterThanEqualTo: (a, b) => a >= b,
  EqualTo: (a, b) => a == b,
};

export const useBreakpoint = (
  breakpointSize,
  directionComparator = QueryType.LessThan
) => {
  const [canRender, setCanRender] = useState(
    directionComparator(window.innerWidth, breakpointSize)
  );

  const updateBreakpoint = useCallback(() => {
    const shouldRender = directionComparator(window.innerWidth, breakpointSize);
    setCanRender(shouldRender);
  }, [breakpointSize, directionComparator]);

  useEffect(() => {
    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, [updateBreakpoint]);

  return canRender;
};
