import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

// components
import Select from '@components/ui/Select';
import Button from '@components/ui/Button';

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const selectItems = {
  node: [
    'Nvidia GeForce RTX 3090',
    'Nvidia GeForce RTX 3080',
    'Nvidia GeForce RTX 3070',
    'Nvidia Titan RTX',
    'Nvidia GeForce RTX 2080 Ti',
    'Nvidia GeForce RTX 2060 Ti',
    'Nvidia Titan V',
    'Nvidia GeForce RTX 2080 Super',
    'Nvidia GeForce RTX 2080',
    'Nvidia GeForce RTX 2070 Super',
    'Nvidia GeForce GTX 1080 Ti',
    'CPU',
  ],
  framework: [
    'Pytorch 1.8.1',
    'Pytorch 1.7.1',
    'Pytorch 1.6.0',
    'Pytorch 1.5.1',
    'Pytorch 1.4.0',
    'Pytorch 1.3.1',
    'Pytorch 1.2.0',
    'Pytorch 1.1.0',
    'Tensorflow 2.4.1',
    'Tensorflow 2.3.2',
    'Tensorflow 2.2.0',
    'Tensorflow 2.1.3',
    'Tensorflow 2.1.0',
  ],
  container: [
    'Docker',
    'Docker + Source Code',
    'Kubernetes',
    'Kubernetes + Source Code',
  ],
};

const ExperimentDownloadModal: React.FC<Props> = ({ show, setShow }) => {
  const [selectedFramework, setSelectedFramework] = useState<string>(
    selectItems.framework[0],
  );
  const [selectedContainer, setSelectedContainer] = useState<string>(
    selectItems.container[0],
  );

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        static
        className="absolute z-10 inset-0"
        open={show}
        onClose={setShow}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-32 text-center sm:block sm:py-0 md:p-0">
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
            <div className="relative w-full inline-block align-bottom bg-white rounded px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:p-6">
              <button
                className="absolute top-3 right-3 rounded-full group"
                onClick={() => setShow(false)}
              >
                <XIcon className="w-6 h-6 group-hover:opacity-70" />
              </button>
              <h5 className="text-xl text-left font-medium">Download</h5>
              <div className="mt-6 space-y-6 text-left">
                <Select
                  label="Container"
                  items={selectItems.container.map((container) => ({
                    label: container,
                    value: container,
                    key: container,
                  }))}
                  selectedValue={selectedContainer}
                  onSelect={(item) =>
                    setSelectedContainer(item.value as string)
                  }
                />
                <Select
                  disabled={true}
                  label="Framework (For subscribed user)"
                  items={selectItems.framework.map((framework) => ({
                    label: framework,
                    value: framework,
                    key: framework,
                  }))}
                  selectedValue={selectedFramework}
                  onSelect={(item) =>
                    setSelectedFramework(item.value as string)
                  }
                />
              </div>
              <div className="mt-8 mb-4 flex justify-end items-center space-x-4">
                <Button color="red" onClick={() => setShow(false)}>
                  Cancel
                </Button>
                <a
                  href="/download/SST2_BERT_hidden1024_dropout0.1.zip"
                  download
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  <Button>Download</Button>
                </a>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ExperimentDownloadModal;
