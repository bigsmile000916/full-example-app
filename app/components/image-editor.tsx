import { Dialog, Transition } from '@headlessui/react';
import { Post } from '@shared/types/post';
import classNames from 'classnames';
import React, {
  ChangeEvent,
  FC,
  Fragment,
  useCallback,
  useRef,
  useState,
} from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';
import {
  Control,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

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
  const ref = useRef<AvatarEditor>(null);
  const size = sizes[type];

  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setTargetImage(acceptedFiles[0]);
    setIsOpen(true);
  }, []);

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
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
    const image = ref.current?.getImage();

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
            'aspect-video',
            isDragAccept ? 'bg-blue-500' : 'bg-black'
          )}
        >
          {value && (
            <img
              src={value as string}
              className="w-full block object-cover"
              alt=""
            />
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 text-slate-400">
        <button>remove</button>
        <button>change</button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    ref={ref}
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

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={crop}
                    >
                      Crop
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
