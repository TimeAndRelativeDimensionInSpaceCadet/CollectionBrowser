import { useCallback, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useClassConcat } from '../../Hooks/useClassConcat';
import { SortToggleButton } from '../SortToggleButton';
import { DebouncedInput } from '../DebouncedInput';
import { SortBySelectInput } from '../SortBySelectInput';
import { SidebarDrawer } from '../SidebarDrawer';
import { HamburgerToggle } from '../HamburgerToggle';
import { useBreakpoint, QueryType } from '../../Hooks/useBreakpoint';

export const ControlBar = ({
  className,
  drawerContainerRef,
  onSearch,
  onSortDirectionChange,
  onSortByChange,
}) => {
  const { current: sortOptions } = useRef(['artist', 'title', 'year']);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useClassConcat(
    'flex flex-row-reverse items-center max-w-full w-full p-3 bg-slate-700 z-10',
    className
  );

  const isMobile = useBreakpoint(750, QueryType.LessThanEqualTo);

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

  const handleToggleDrawer = () => setDrawerOpen(prev => !prev);

  const controls = useMemo(() => {
    const controls = [
      onSortDirectionChange && typeof onSortDirectionChange === 'function' && (
        <SortToggleButton
          key="SortDirectionToggle"
          handleSortDirectionChange={handleSortChange}
        />
      ),
      onSortByChange && typeof onSortByChange === 'function' && (
        <SortBySelectInput
          key="SortByInput"
          className="mr-2"
          sortOptions={sortOptions}
          onSortByChange={handleSortByChange}
        />
      ),
      onSearch && typeof onSearch === 'function' && (
        <DebouncedInput
          className="mr-2"
          key="SearchInput"
          placeholder="Search"
          handleChange={handleSearch}
        />
      ),
    ];

    return controls.reduce((a, b) => (b ? [...a, b] : a), []);
  }, [onSortByChange, onSortDirectionChange, onSearch]);

  return (
    <>
      <div className={classes}>
        {isMobile && (
          <HamburgerToggle
            isToggled={drawerOpen}
            handleToggle={handleToggleDrawer}
          />
        )}

        {!isMobile && controls}
      </div>
      {drawerContainerRef.current &&
        createPortal(
          <SidebarDrawer open={drawerOpen}>{controls}</SidebarDrawer>,
          drawerContainerRef.current
        )}
    </>
  );
};
