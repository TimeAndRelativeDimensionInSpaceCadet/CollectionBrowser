import { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import { useClassConcat } from '../../Hooks/useClassConcat';
import {
  ControlStateProps,
  useControlContext,
} from '../../Hooks/useControlGroup';

export const SortBySelectInput = ({
  className,
  sortOptions,
  onSortByChange,
}) => {
  const {
    state: { sortType },
    dispatch,
  } = useControlContext();
  const [open, setOpen] = useState(false);
  const classes = useClassConcat(`relative w-auto`, className);
  const selector = useRef(null);

  const getMinCharacterLength = useMemo(
    () => `${sortOptions.reduce((a, b) => Math.max(a, b.length), 0)}ch`,
    [sortOptions]
  );

  const handleClick = () => setOpen(prev => !prev);

  const handleSortByChange = useCallback(
    value => {
      dispatch({ payload: value, type: ControlStateProps.sortType });
      onSortByChange?.(value);
      handleClick();
    },
    [onSortByChange]
  );

  const handleSelect = useCallback(
    option => () => {
      handleSortByChange(option);
    },
    [handleSortByChange]
  );

  const options = useMemo(() => {
    return sortOptions?.map((option, index) => {
      return (
        <div
          className={`${
            sortType == option ? 'bg-slate-600 ' : 'hover:bg-slate-600 '
          }p-2 cursor-pointer select-none first:rounded-t-md last:rounded-b-md`}
          key={index}
          onClick={handleSelect(option)}
        >
          {option.toTitleCase()}
        </div>
      );
    });
  }, [sortOptions, sortType, handleSelect]);

  const onClickAway = useCallback(
    ({ target }) => {
      open && !selector.current.contains(target) && handleClick();
    },
    [open, selector]
  );

  useEffect(() => {
    document.addEventListener('click', onClickAway);
    return () => {
      document.removeEventListener('click', onClickAway);
    };
  }, [onClickAway]);

  return (
    <div ref={selector} className={classes}>
      <div
        className="flex pl-3 pt-3 pb-3 dark-theme-bg pr-12 rounded-md cursor-pointer"
        onClick={handleClick}
      >
        <div className="absolute right-0 top-0 px-3 h-full flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${!open ? '' : 'transform-flip '}size-6 transition-all`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        <div
          className="h-full min-w-[var(--minCharLength)] select-none"
          style={{ '--minCharLength': getMinCharacterLength }}
        >
          {sortType.toTitleCase()}
        </div>
      </div>
      <div
        aria-hidden={!open}
        className={`${
          !open ? 'hidden' : ''
        } absolute top-full right-0  dark-theme-bg w-full rounded-md`}
      >
        {options}
      </div>
    </div>
  );
};
