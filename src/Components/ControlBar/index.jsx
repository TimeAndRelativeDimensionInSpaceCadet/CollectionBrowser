import { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useClassConcat } from '../../Hooks/useClassConcat';
import { SidebarDrawer } from '../SidebarDrawer';
import { HamburgerToggle } from '../HamburgerToggle';
import { ControlGroup } from './ControlGroup';
import { useBreakpoint, QueryType } from '../../Hooks/useBreakpoint';

export const ControlBar = ({
  className,
  drawerContainerRef,
  onSearch,
  onSortDirectionChange,
  onSortByChange,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useClassConcat(
    'flex flex-row-reverse items-center max-w-full w-full p-3 bg-slate-700 z-10',
    className
  );

  const isMobile = useBreakpoint(750, QueryType.LessThanEqualTo);
  const handleToggleDrawer = () => setDrawerOpen(prev => !prev);

  const controlsGroup = useMemo(
    () => (
      <ControlGroup
        handleSearch={onSearch}
        handleSortDirection={onSortDirectionChange}
        handleSortType={onSortByChange}
      />
    ),
    [onSearch, onSortByChange, onSortDirectionChange]
  );

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
