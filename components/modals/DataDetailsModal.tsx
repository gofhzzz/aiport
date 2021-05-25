import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useLayoutEffect,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';

// icons
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from '@heroicons/react/outline';

// components
import Button from '@components/ui/Button';

// types
import { DatasetDataInfo } from 'types/data';
import { DataInfoWithChecked } from 'pages/dataset/data';
import formatDate from '@utils/formatDate';

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setCangeData: Dispatch<SetStateAction<DataInfoWithChecked[] | null>>;
  data: DatasetDataInfo[];
  selectedIndex: number;
}

const DataDetailsModal: React.FC<Props> = ({
  show,
  setShow,
  data,
  selectedIndex,
  setCangeData,
}) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [imageIndex, setImageIndex] = React.useState<number>(selectedIndex);

  useLayoutEffect(() => {
    setImageIndex(selectedIndex);
  }, [selectedIndex]);

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
            <div className="relative inline-block align-bottom bg-white rounded p-8 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl">
              <button
                className="absolute top-3 right-3 rounded-full group"
                onClick={() => setShow(false)}
              >
                <XIcon className="w-6 h-6 group-hover:opacity-70" />
              </button>
              <h5 className="text-lg font-medium">{`0000${
                imageIndex + 1
              }.jpg`}</h5>

              <div className="mt-4 sm:flex items-center">
                <button
                  onClick={() => setImageIndex((prev) => prev - 1)}
                  disabled={imageIndex === 0}
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <div>
                  <img
                    className="shadow w-[267px] h-[327px] rounded-md object-contain"
                    src={`/dataset/data/${imageIndex}.jpg`}
                  />
                </div>
                <button
                  onClick={() => setImageIndex((prev) => prev + 1)}
                  disabled={imageIndex === 19}
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
                <div className="flex flex-col justify-between">
                  <div className="sm:ml-6 min-w-[200px] text-left space-y-5">
                    <div>
                      <h6 className="text-sm text-gray-500">
                        Data Key (Name):
                      </h6>
                      <p>{data[imageIndex].name}</p>
                    </div>
                    <div>
                      <h6 className="text-sm text-gray-500">AI:</h6>
                      <p>Celebrity Look-alike App</p>
                    </div>
                    <div>
                      <h6 className="text-sm text-gray-500">Train/Test</h6>
                      <p>{data[imageIndex].split}</p>
                    </div>
                    <div>
                      <h6 className="text-sm text-gray-500">Created Date:</h6>
                      <p>{formatDate(String(new Date()))}</p>
                    </div>
                    <div className="h-[150px]">
                      <h6 className="text-sm text-gray-500">Label</h6>
                      {edit ? (
                        <>
                          <div className="flex mt-2 items-center">
                            <p className="w-20 flex">
                              X:
                              <input
                                value={String(data[imageIndex].x_1)}
                                className="w-12 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                                onChange={(e) => {
                                  setCangeData(
                                    (prev) =>
                                      prev &&
                                      prev.map((item, idx) => {
                                        if (idx === imageIndex)
                                          return {
                                            ...item,
                                            x_1: Number(e.target.value),
                                          };
                                        return item;
                                      }),
                                  );
                                }}
                              />
                            </p>
                            <p className="w-20 flex">
                              Y:
                              <input
                                value={String(data[imageIndex].y_1)}
                                className="w-12 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                                onChange={(e) => {
                                  setCangeData(
                                    (prev) =>
                                      prev &&
                                      prev.map((item, idx) => {
                                        if (idx === imageIndex)
                                          return {
                                            ...item,
                                            y_1: Number(e.target.value),
                                          };
                                        return item;
                                      }),
                                  );
                                }}
                              />
                            </p>
                          </div>
                          <div className="flex mt-4">
                            <p className="w-20 flex">
                              W:
                              <input
                                value={String(data[imageIndex].width)}
                                className="w-12 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                                onChange={(e) => {
                                  setCangeData(
                                    (prev) =>
                                      prev &&
                                      prev.map((item, idx) => {
                                        if (idx === imageIndex)
                                          return {
                                            ...item,
                                            width: Number(e.target.value),
                                          };
                                        return item;
                                      }),
                                  );
                                }}
                              />
                            </p>
                            <p className="w-20 flex">
                              H:
                              <input
                                value={String(data[imageIndex].height)}
                                className="w-12 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                                onChange={(e) => {
                                  setCangeData(
                                    (prev) =>
                                      prev &&
                                      prev.map((item, idx) => {
                                        if (idx === imageIndex)
                                          return {
                                            ...item,
                                            height: Number(e.target.value),
                                          };
                                        return item;
                                      }),
                                  );
                                }}
                              />
                            </p>
                          </div>
                          <p className="mt-4">
                            Label:
                            <input
                              value={String(data[imageIndex].label)}
                              className="w-20 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                              onChange={(e) => {
                                setCangeData(
                                  (prev) =>
                                    prev &&
                                    prev.map((item, idx) => {
                                      if (idx === imageIndex)
                                        return {
                                          ...item,
                                          label: Number(e.target.value),
                                        };
                                      return item;
                                    }),
                                );
                              }}
                            />
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="flex mt-2 items-center">
                            <p className="w-20">X: {data[imageIndex].x_1}</p>
                            <p className="w-20">Y: {data[imageIndex].y_1}</p>
                          </div>
                          <div className="flex mt-4">
                            <p className="w-20">W: {data[imageIndex].width}</p>
                            <p className="w-20">H: {data[imageIndex].height}</p>
                          </div>
                          <p className="mt-4">
                            Label: {data[imageIndex].label}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    className="ml-4 mt-4"
                    onClick={() => setEdit((prev) => !prev)}
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
