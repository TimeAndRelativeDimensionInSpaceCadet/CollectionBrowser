import { useClassConcat } from '../../Hooks/useClassConcat';
export const SidebarDrawer = ({ children, open }) => {
  const classes = useClassConcat(
    !open ? 'hidden' : '',
    'absolute top-0 left-0 size-full backdrop-blur-sm z-20'
  );
  return (
    <div className={classes}>
      <div className="absolute right-0 h-[100vh] w-[75%] bg-slate-700 shadow-[rgba(0,0,0,0.5)_-3px_0px_6px_0px]">
        <div className="p-3 size-full flex flex-col">{children}</div>
      </div>
    </div>
  );
};
