import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Slider } from '@material-ui/core';

// components
import Select from '@components/ui/Select';
import Button from '@components/ui/Button';

// icons
import { XIcon } from '@heroicons/react/outline';

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  onRunning?: () => void;
}

const selectItems = [
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
];

const ExperimentRunModal: React.FC<Props> = ({ show, setShow, onRunning }) => {
  const [selectedNode, setSelectedNode] = useState<string>(selectItems[0]);
  const [gpuNum, setGpuNum] = useState<number>(1);

  const getValueText: (gpuNum: number) => string = React.useCallback(
    (gpuNum) => {
      setGpuNum(gpuNum);
      return String(gpuNum);
    },
    [],
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
            <div className="relative w-full inline-block align-bottom bg-white rounded px-4 h-[500px] pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-3xl sm:p-6">
              <button
                className="absolute top-3 right-3 rounded-full group"
                onClick={() => setShow(false)}
              >
                <XIcon className="w-6 h-6 group-hover:opacity-70" />
              </button>
              <h5 className="text-3xl text-left font-Semibold">Run</h5>
              <div className="mt-6 flex text-left justify-between">
                <div className="mr-30">
                  <Select
                    className="w-80"
                    label="GPU"
                    items={selectItems.map((node) => ({
                      label: node,
                      value: node,
                      key: node,
                    }))}
                    selectedValue={selectedNode}
                    onSelect={(item) => setSelectedNode(item.value as string)}
                  />

                  <div className="mt-8">
                    <p>Number of GPUs</p>
                    <Slider
                      defaultValue={3}
                      getAriaValueText={getValueText}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={1}
                      max={10}
                    />

                    <p className="text-right">{gpuNum} / 10</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-gray-700 text-lg font-semibold">Config</p>
                  <div className="w-96 bg-gray-200 rounded-md px-4 py-2">
                    <div className="flex justify-between">
                      <p>GPUs:</p>
                      <p className="line-clamp-1">
                        {gpuNum} * {selectedNode}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>vGPUs:</p>
                      <p>24</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Memory:</p>
                      <p>72GB</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Storage</p>
                      <p>480GB</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-10">
                <div>
                  <p className="text-xl font-semibold mb-2 text-left">Cost</p>
                  <div className="flex justify-between mb-4">
                    <p>Expected Hourly Costs:</p>
                    <p>3.60 USD</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Expected Monthly Costs:</p>
                    <p>{(3.6 * gpuNum).toFixed(2)} USD</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 mb-4 flex justify-end items-center space-x-4">
                <Button
                  className="w-28"
                  color="red"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </Button>

                <Button
                  className="w-28"
                  onClick={() => {
                    if (onRunning) onRunning();
                    setShow(false);
                  }}
                >
                  OK
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ExperimentRunModal;
