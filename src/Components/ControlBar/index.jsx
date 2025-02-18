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
  const handleToggleDrawer = () => setDrawerOpen(prev => !prev);

  const { current: controlsGroup } = useRef([
    <div className="flex">
      {onSortDirectionChange && typeof onSortDirectionChange === 'function' && (
        <SortToggleButton
          key="SortDirectionToggle"
          handleSortDirectionChange={onSortDirectionChange}
        />
      )}
      {onSortByChange && typeof onSortByChange === 'function' && (
        <SortBySelectInput
          key="SortByInput"
          className="mr-2"
          sortOptions={sortOptions}
          onSortByChange={onSortByChange}
        />
      )}
    </div>,
    onSearch && typeof onSearch === 'function' && (
      <DebouncedInput
        className="mr-2"
        key="SearchInput"
        placeholder="Search"
        handleChange={onSearch}
      />
    ),
  ]);

  return (
    <>
      <div className={classes}>
        {isMobile && (
          <HamburgerToggle
            isToggled={drawerOpen}
            handleToggle={handleToggleDrawer}
          />
        )}

        {!isMobile && controlsGroup}
      </div>
      {isMobile &&
        drawerContainerRef.current &&
        createPortal(
          <SidebarDrawer open={drawerOpen}>{controlsGroup}</SidebarDrawer>,
          drawerContainerRef.current
        )}
    </>
  );
};
