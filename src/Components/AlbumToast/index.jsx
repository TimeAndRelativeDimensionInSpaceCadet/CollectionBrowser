import { useState, useCallback, useREf } from 'react';
import { Toast } from 'radix-ui';
import { ShuffleIcon } from '@radix-ui/react-icons';
import './index.scss';

const AlbumToast = ({ setAlbum = () => {} }) => {
  const [open, setOpen] = React.useState(false);
  const recordRef = React.useRef({});
  const timerRef = React.useRef(0);

  const getDetails = React.useCallback(() => {
    const { basic_information: basicInformation = {} } = recordRef?.current;

    return basicInformation;
  }, [recordRef]);

  return (
    <Toast.Provider duration={10000}>
      <button
        className="mr-2 p-3 rounded-md dark-theme-bg flex flex-row items-center"
        onClick={() => {
          recordRef.current = setAlbum();

          setOpen(true);
          console.log(getDetails());
        }}
      >
        <ShuffleIcon className="mr-2" /> Get Random
      </button>

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="text-black">{getDetails()?.title}</Toast.Title>
        <Toast.Description asChild></Toast.Description>
        <Toast.Action className="ToastAction" asChild altText="dismiss">
          <button className="text-black">dismiss</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default AlbumToast;
