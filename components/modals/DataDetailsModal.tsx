import React, { Dispatch, Fragment, SetStateAction } from 'react';
import NextImage from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  data: DataInfo | null;
}

const DataDetailsModal: React.FC<Props> = ({ show, setShow, data }) => {
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
                <div className="sm:ml-6 min-w-[200px] text-left space-y-5">
                  <div>
                    <h6 className="text-sm text-gray-500">Data Key (Name):</h6>
                    <p>{data?.name}</p>
                  </div>
                  <div>
                    <h6 className="text-sm text-gray-500">Assigned Project:</h6>
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
