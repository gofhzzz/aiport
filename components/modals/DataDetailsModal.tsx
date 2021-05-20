import React, { Dispatch, Fragment, SetStateAction } from 'react';
import NextImage from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

// components
import Button from '@components/ui/Button';

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  data: DataInfo | null;
  label: {
    x: number;
    y: number;
    w: number;
    h: number;
    label: number;
  };
  isEdit?: boolean;
  onChangeLabel: (label: {
    x: number;
    y: number;
    w: number;
    h: number;
    label: number;
  }) => void;
}

const DataDetailsModal: React.FC<Props> = ({
  show,
  setShow,
  data,
  label,
  onChangeLabel,
  isEdit = false,
}) => {
  const [edit, setEdit] = React.useState<boolean>(isEdit);
  const [labelItems, setLabelItems] = React.useState<{
    x: number;
    y: number;
    w: number;
    h: number;
    label: number;
  }>(label);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        static
        className="absolute z-10 inset-0"
        open={show}
        onClose={setShow}
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
              <h5 className="text-lg font-medium">
                {data?.name ?? 'loading...'}
              </h5>

              <div className="mt-4 sm:flex">
                <NextImage
                  className="shadow rounded-md"
                  src={data?.imageUrl ?? ''}
                  width={500}
                  height={500}
                  objectFit="cover"
                />
                <div className="flex flex-col justify-between">
                  <div className="sm:ml-6 min-w-[200px] text-left space-y-5">
                    <div>
                      <h6 className="text-sm text-gray-500">
                        Data Key (Name):
                      </h6>
                      <p>{data?.name}</p>
                    </div>
                    <div>
                      <h6 className="text-sm text-gray-500">
                        Assigned Project:
                      </h6>
                      <p>{data?.name}</p>
                    </div>
                    <div>
                      <h6 className="text-sm text-gray-500">Uploaded by:</h6>
                      <p>{data?.uploader}</p>
                    </div>
                    <div>
                      <h6 className="text-sm text-gray-500">Created Date:</h6>
                      <p>
                        {data?.created
                          ? new Date(data.created).toDateString()
                          : ''}
                      </p>
                    </div>
                    <div>
                      <h6 className="text-sm text-gray-500">Label</h6>
                      {edit ? (
                        <>
                          <div className="flex mt-2 items-center">
                            <p className="w-20 flex">
                              X:
                              <input
                                placeholder={String(labelItems.x)}
                                value={String(labelItems.x)}
                                onChange={(e) =>
                                  setLabelItems({
                                    ...labelItems,
                                    x: Number(e.target.value),
                                  })
                                }
                                className="w-12 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                              />
                            </p>
                            <p className="w-20 flex">
                              Y:
                              <input
                                placeholder={String(labelItems.y)}
                                value={String(labelItems.y)}
                                onChange={(e) =>
                                  setLabelItems({
                                    ...labelItems,
                                    y: Number(e.target.value),
                                  })
                                }
                                className="w-12 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                              />
                            </p>
                          </div>
                          <div className="flex mt-4">
                            <p className="w-20 flex">
                              W:
                              <input
                                placeholder={String(labelItems.w)}
                                value={String(labelItems.w)}
                                onChange={(e) =>
                                  setLabelItems({
                                    ...labelItems,
                                    w: Number(e.target.value),
                                  })
                                }
                                className="w-12 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                              />
                            </p>
                            <p className="w-20 flex">
                              H:
                              <input
                                placeholder={String(labelItems.h)}
                                value={String(labelItems.h)}
                                onChange={(e) =>
                                  setLabelItems({
                                    ...labelItems,
                                    h: Number(e.target.value),
                                  })
                                }
                                className="w-12 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                              />
                            </p>
                          </div>
                          <p className="mt-4">
                            Label:
                            <input
                              placeholder={String(labelItems.label)}
                              value={String(labelItems.label)}
                              onChange={(e) =>
                                setLabelItems({
                                  ...labelItems,
                                  label: Number(e.target.value),
                                })
                              }
                              className="w-20 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                            />
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="flex mt-2 items-center">
                            <p className="w-20">X: {labelItems.x}</p>
                            <p className="w-20">Y: {labelItems.y}</p>
                          </div>
                          <div className="flex mt-4">
                            <p className="w-20">W: {labelItems.w}</p>
                            <p className="w-20">H: {labelItems.h}</p>
                          </div>
                          <p className="mt-4">Label: {labelItems.label}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    className="ml-4"
                    onClick={() => {
                      onChangeLabel(labelItems);
                      setEdit((prev) => !prev);
                    }}
                  >
                    {edit ? 'Save' : 'Edit'}
                  </Button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DataDetailsModal;
