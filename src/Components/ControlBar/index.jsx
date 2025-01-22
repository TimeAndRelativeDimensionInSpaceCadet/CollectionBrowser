import { useState, useMemo } from 'react';

export const ControlBar = ({ className, onSearch = () => {} }) => {
  const classes = useMemo(
    () =>
      'sticky w-full h-20 top-0 left-0 bg-slate-700 shadow-md shadow-slate-700/80 z-10'
        .concat(` ${className ?? ''}`)
        .trim(),
    [className]
  );
  
  return <div className={classes}></div>;
};
