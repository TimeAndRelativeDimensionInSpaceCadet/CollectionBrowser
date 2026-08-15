import { useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useClassConcat } from '../../Hooks/useClassConcat';
import { SidebarDrawer } from '../SidebarDrawer';
import { HamburgerToggle } from '../HamburgerToggle';
import { ControlGroup } from './ControlGroup';
import { useBreakpoint, QueryType } from '../../Hooks/useBreakpoint';
import { useControlState } from '../../Hooks/useControlGroup';
import { ControlContext } from '../../Hooks/useControlGroup';
import { ShuffleIcon } from '@radix-ui/react-icons';
import AlbumToast from '../AlbumToast';

export const ControlBar = ({
  className,
  isLoading,
  drawerContainerRef,
  onSearch,
  onSortDirectionChange,
  onSortByChange,
  onRandom,
}) => {
  const [state, dispatch] = useControlState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useClassConcat(
    'flex flex-row-reverse items-center max-w-full w-full p-3 bg-slate-700 z-10',
    className
  );

  const isMobile = useBreakpoint(750, QueryType.LessThanEqualTo);
  const handleToggleDrawer = () => setDrawerOpen(prev => !prev);

  const controlsGroup = useCallback(
    (isDrawer = false) => (
      <ControlGroup
        isLoading={isLoading}
        isDrawer={isDrawer}
        handleSearch={onSearch}
        handleSortDirection={onSortDirectionChange}
        handleSortType={onSortByChange}
      />
    ),
    [onSearch, onSortByChange, onSortDirectionChange, isLoading]
  );

  return (
    <ControlContext.Provider value={{ state, dispatch }}>
      <div className={classes}>
        {isMobile && (
          <HamburgerToggle
            isToggled={drawerOpen}
            handleToggle={handleToggleDrawer}
          />
        )}

        {!isMobile && controlsGroup()}

        <AlbumToast isLoading={isLoading} setAlbum={onRandom} />
      </div>
      {isMobile &&
        drawerContainerRef.current &&
        createPortal(
          <SidebarDrawer open={drawerOpen}>
            {controlsGroup(true)}
          </SidebarDrawer>,
          drawerContainerRef.current
        )}
    </ControlContext.Provider>
  );
};
