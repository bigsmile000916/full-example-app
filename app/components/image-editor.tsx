import { Dialog, Transition } from '@headlessui/react';
import { PhotographIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { ChangeEvent, Fragment, useCallback, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';
import { useController, UseControllerProps } from 'react-hook-form';

const sizes = {
  cover: {
    canvas: {
      width: 480,
      height: 270,
    },
    result: {
      width: 960,
      height: 540,
    },
  },
  avatar: {
    canvas: {
      width: 480,
      height: 270,
    },
    result: {
      width: 960,
      height: 540,
    },
  },
};

const ImageEditor = <T,>({
  name,
  control,
  rules,
  defaultValue,
  type,
}: UseControllerProps<T> & {
  type: 'cover' | 'avatar';
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1.5);
  const [targetImage, setTargetImage] = useState<File>();
  const avatarEditorRef = useRef<AvatarEditor>(null);
  const cropButtonRef = useRef(null);

  const size = sizes[type];

  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  console.log(error);

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setTargetImage(acceptedFiles[0]);
    setIsOpen(true);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject, open } =
    useDropzone({
      onDropAccepted,
      accept: {
        'image/jpeg': [],
        'image/png': [],
      },
    });

  const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const crop = () => {
    const image = avatarEditorRef.current?.getImage();

    const canvas = document.createElement('canvas');
    canvas.width = size.result.width;
    canvas.height = size.result.height;
    const ctx = canvas.getContext('2d');
    ctx!.drawImage(image!, 0, 0, size.result.width, size.result.height);

    onChange(canvas.toDataURL('image/png'));
    closeModal();
  };

  return (
    <div>
      <div {...getRootProps()}>
        <input onBlur={onBlur} type="file" {...getInputProps()} />
        <div
          className={classNames(
            'aspect-video rounded-lg border-2 grid place-content-center cursor-pointer overflow-hidden hover:border-blue-500',
            isDragAccept && 'border-blue-500',
            (isDragReject || error) && 'border-red-500',
            value ? 'border-solid' : 'border-dashed border-slate-600'
          )}
        >
          {value ? (
            <img
              src={value as string}
              className="w-full block object-cover"
              alt=""
            />
          ) : (
            <div className="text-slate-500">
              <PhotographIcon className="w-10 h-10 mb-2 mx-auto" />
              <p>Drop Image Here</p>
            </div>
          )}
        </div>
      </div>

      {value && (
        <div className="flex justify-end items-center space-x-2 text-slate-500 mt-1 text-sm">
          <button
            className="hover:text-slate-300"
            type="button"
            onClick={() => onChange(null)}
          >
            Delete
          </button>
          <button className="hover:text-slate-300" type="button" onClick={open}>
            Change
          </button>
        </div>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          initialFocus={cropButtonRef}
          as="div"
          className="relative z-10"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-25 bg-black" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <AvatarEditor
                    ref={avatarEditorRef}
                    image={targetImage!}
                    width={size.canvas.width}
                    height={size.canvas.height}
                    border={50}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={scale}
                    rotate={0}
                  />

                  <input
                    type="range"
                    min="1"
                    max="2"
                    defaultValue="1.5"
                    step="0.1"
                    onChange={handleScale}
                  />

                  <div className="mt-4 flex space-x-4">
                    <button
                      ref={cropButtonRef}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={crop}
                    >
                      Crop
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ImageEditor;
