import { useState, useRef, useEffect } from 'react';
import { Toast } from 'radix-ui';
import { ShuffleIcon, Cross2Icon } from '@radix-ui/react-icons';
import './index.scss';

const AlbumToast = ({ setAlbum = () => {}, isLoading = false }) => {
  const [open, setOpen] = useState(false);
  const currentRecord = useRef({});
  const timerRef = useRef(0);

  const getDetails = albumInfo => {
    const { basic_information: basicInformation = {} } = albumInfo;

    return basicInformation;
  };

  useEffect(() => {
    if (isLoading) setOpen(false);
    return () => clearTimeout(timerRef.current);
  }, [isLoading]);

  return (
    <Toast.Provider duration={10000}>
      <button
        className="p-3 rounded-md dark-theme-bg flex flex-row items-center hover:cursor-pointer mr-auto select-none"
        onClick={() => {
          setOpen(false);

          const album = setAlbum();

          timerRef.current = window.setTimeout(() => {
            currentRecord.current = getDetails(album);
            console.log(currentRecord.current);
            setOpen(true);
          }, 100);
        }}
        disabled={isLoading}
      >
        <ShuffleIcon className="mr-2" /> Get Random
      </button>

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="text-black">
          <div className="font-semibold">{currentRecord?.current?.title}</div>
          <div>
            {'by '}
            {currentRecord?.current?.artists?.map(e => e.name).join(' ')}
          </div>
        </Toast.Title>
        <Toast.Description asChild>
          <img
            className="pt-2"
            src={currentRecord?.current?.cover_image}
            alt="album art"
          />
        </Toast.Description>
        <Toast.Close className="ToastAction" asChild>
          <button className="text-black hover:cursor-pointer">
            <Cross2Icon />
          </button>
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default AlbumToast;
