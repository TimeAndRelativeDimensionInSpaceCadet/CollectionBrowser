import { useCallback, useRef, useState, useMemo } from 'react';
import { useClassConcat } from '../../Hooks/useClassConcat';
import { SortToggleButton } from '../SortToggleButton';
import { DebouncedInput } from '../DebouncedInput';
import { SortBySelectInput } from '../SortBySelectInput';
import { SidebarDrawer } from '../SidebarDrawer';

export const ControlBar = ({
  className,
  onSearch,
  onSortDirectionChange,
  onSortByChange,
}) => {
  const { current: sortOptions } = useRef(['artist', 'title', 'year']);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const classes = useClassConcat(
    'sticky flex flex-row-reverse max-w-full w-full h-20 p-3 top-0 left-0 bg-slate-700 shadow-md shadow-slate-700/80 z-10',
    className
  );

  const handleSortChange = useCallback(
    direction => {
      onSortDirectionChange?.(direction);
    },
    [onSortDirectionChange]
  );

  const handleSearch = useCallback(
    query => {
      onSearch?.(query);
    },
    [onSearch]
  );

  const handleSortByChange = useCallback(
    value => {
      onSortByChange?.(value);
    },
    [onSortByChange]
  );

  const controls = useMemo(() => {
    const result = [
      onSortDirectionChange && typeof onSortDirectionChange === 'function' && (
        <SortToggleButton
          key="SortDirectionToggle"
          className="self-center"
          handleSortDirectionChange={handleSortChange}
        />
      ),
      onSortByChange && typeof onSortByChange === 'function' && (
        <SortBySelectInput
          key="SortByInput"
          className="self-center mr-2"
          sortOptions={sortOptions}
          onSortByChange={handleSortByChange}
        />
      ),
      onSearch && typeof onSearch === 'function' && (
        <DebouncedInput
          key="SearchInput"
          className="mr-2 self-center"
          placeholder="Search"
          handleChange={handleSearch}
        />
      ),
    ].reduce((a, b) => (b ? [...a, b] : a), []);

    return result;
  }, [onSortByChange, onSortDirectionChange, onSearch]);

  const handleToggleDrawer = () => setDrawerOpen(prev => !prev);

  return (
    <>
      <SidebarDrawer open={drawerOpen}>
        <button className="bg-transparent" onClick={handleToggleDrawer}>
          x
        </button>
        {controls}
      </SidebarDrawer>
      <div className={classes}>{controls}</div>
    </>
  );
};
