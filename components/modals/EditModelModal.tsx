import React, { Dispatch, Fragment, SetStateAction } from 'react';
import cn from 'classnames';
import { Dialog, Transition } from '@headlessui/react';

// icons
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XIcon,
} from '@heroicons/react/outline';

interface Props {
  className?: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  data: { name: string; model: string[]; checked: boolean };
  setChange: Dispatch<
    SetStateAction<{ name: string; model: string[]; checked: boolean }[]>
  >;
}

const ModelItems = [
  'FasterRCNN',
  'fasterrcnn_resnet50_fpn',
  'fasterrcnn_mobilenet_v3_large_320_fpn',
  'fasterrcnn_mobilenet_v3_large_fpn',
];

const EditModelModal = ({
  className,
  show,
  setShow,
  data,
  setChange,
}: Props) => {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        static
        className={cn(className, 'absolute z-10 inset-0')}
        open={show}
        onClose={() => setShow((prev) => !prev)}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-32 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <button
                className="absolute top-3 right-3 rounded-full group"
                onClick={() => setShow(false)}
              >
                <XIcon className="w-6 h-6 group-hover:opacity-70" />
              </button>
              <h5 className="text-lg font-medium text-left">Add Model</h5>
              <p className="text-sm text-gray-500 text-left">{data.name}</p>

              <div className="mt-4">
                <div className="divide-y-2 my-4">
                  {ModelItems.map((item, idx) => (
                    <div
                      className="flex justify-between px-2 py-4"
                      key={`${item}-${idx}`}
                    >
                      <p>{item}</p>
                      {data.model.includes(item) ? (
                        <button
                          onClick={() => {
                            setChange((prev) =>
                              prev.map((val) => {
                                if (val.name === data.name) {
                                  return {
                                    ...val,
                                    model: val.model.filter(
                                      (temp) => temp !== item,
                                    ),
                                  };
                                }
                                return val;
                              }),
                            );
                          }}
                        >
                          <MinusCircleIcon className="w-6 h-6 text-red-600" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setChange((prev) =>
                              prev.map((val) => {
                                if (val.name === data.name) {
                                  return {
                                    ...val,
                                    model: [...val.model, item],
                                  };
                                }
                                return val;
                              }),
                            );
                          }}
                        >
                          <PlusCircleIcon className="w-6 h-6 text-lightBlue-500" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditModelModal;
