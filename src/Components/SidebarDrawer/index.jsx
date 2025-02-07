export const SidebarDrawer = ({ children, open }) => {
  return (
    <div className="absolute top-0 left-0 size-full backdrop-blur-sm z-20">
      <div className="absolute right-0 h-[100vh] w-[75%] bg-slate-700 shadow-[rgba(0,0,0,0.5)_-3px_0px_6px_0px]">
        <div className="p-3 size-full">
          <button className="bg-transparent">x</button>
          {children}
        </div>
      </div>
    </div>
  );
};
