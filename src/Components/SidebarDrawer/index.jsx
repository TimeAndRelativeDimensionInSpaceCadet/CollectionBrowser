import { useClassConcat } from '../../Hooks/useClassConcat';

export const SidebarDrawer = ({ children, open }) => {
  const classes = useClassConcat(
    !open ? 'hidden' : '',
    'absolute top-0 left-0 size-full backdrop-blur-sm z-20'
  );

  return (
    <div className={classes}>
      <div className="absolute transition-all right-0 h-full w-[75%] bg-slate-700 shadow-[rgba(0,0,0,0.5)_-3px_0px_6px_0px]">
        <div className="p-3 size-full flex flex-col items-end">{children}</div>
      </div>
    </div>
  );
};
