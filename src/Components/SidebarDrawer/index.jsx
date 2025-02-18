import { useClassConcat } from '../../Hooks/useClassConcat';
import { useEffect, useState } from 'react';

export const SidebarDrawer = ({ children, open }) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const overlayClasses = useClassConcat(
    overlayOpen ? 'visible' : 'hidden',
    'absolute top-0 left-0 size-full backdrop-blur-sm z-20'
  );

  const drawerClasses = useClassConcat(
    drawerOpen ? 'w-[65%]' : 'w-0',
    'absolute transition-all right-0 h-full bg-slate-700 shadow-[rgba(0,0,0,0.5)_-3px_0px_6px_0px]'
  );

  useEffect(() => {
    setTimeout(() => setOverlayOpen(open), open ? 0 : 150);
    setTimeout(() => setDrawerOpen(open), open ? 25 : 0);
  }, [open]);

  return (
    <div className={overlayClasses}>
      <div className={drawerClasses}>
        <div className="p-3 size-full flex flex-col items-end overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
