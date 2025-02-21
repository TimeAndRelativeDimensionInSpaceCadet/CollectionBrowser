import { useClassConcat } from '../../Hooks/useClassConcat';

export const SidebarDrawer = ({
  children,
  open,
  onBackDropClick = () => {},
}) => {
  const overlayClasses = useClassConcat(
    'absolute top-0 left-0 size-full backdrop-blur-sm z-10',
    open ? 'visible' : 'hidden'
  );
  const drawerClasses = useClassConcat(
    'absolute transition-all duration-[250ms] right-0 top-0 h-full bg-slate-700 shadow-[rgba(0,0,0,0.5)_-3px_0px_6px_0px] z-20',
    open ? ' w-[65%]' : ' w-0'
  );

  return (
    <>
      <div className={overlayClasses} onClick={onBackDropClick} />
      <div className={drawerClasses}>
        <div className="p-3 size-full flex flex-col items-end overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
};
