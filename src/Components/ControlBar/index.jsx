import { useState } from 'react';

export const ControlBar = ({ className, onSearch = () => {} }) => {
  const classes = (className ?? '').concat(
    ' sticky w-full h-20 top-0 left-0 bg-slate-700 shadow-md shadow-slate-700/80 z-10'
  );
  return <div className={classes}></div>;
};
