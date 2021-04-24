import React, { useState } from 'react';

// contexts
import { useUI } from '@components/ui/context';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';
import Button from '@components/ui/Button';
import { PlusIcon } from '@heroicons/react/outline';
import AddProcessingModal from '@components/modals/AddProcessingModal';

const DatasetProcessingPage = () => {
  const [augSteps, setAugSteps] = useState<ProcessingStep[]>([]);
  const [preSteps, setPreSteps] = useState<ProcessingStep[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [variant, setVariant] = useState<
    'augmentation' | 'preprocessing' | null
  >(null);

  const { showNoti, showModal, closeModal } = useUI();

  return (
    <>
      <div className="mx-auto max-w-screen-xl pt-8 px-4 md:px-6 pb-16">
        <h1 className="text-3xl font-medium">Processing</h1>
        <div className="mt-8 md:grid grid-cols-2 gap-8 space-y-6 md:space-y-0 max-w-md md:max-w-none mx-auto">
          <section className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-center md:text-left text-xl font-medium">
              Augmentation
            </h2>
            <div className="mt-4">
              <Button
                full
                color="white"
                onClick={() => {
                  setVariant('augmentation');
                  setTimeout(() => setShow(true), 100);
                }}
              >
                <PlusIcon className="w-6 h-6" />
                <span>Add Augmentation Step</span>
              </Button>
            </div>
            {augSteps.length === 0 ? (
              <div className="h-80 grid place-items-center">
                No Augmentation Steps
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {augSteps.map((processing, idx) => (
                  <li key={processing.name} className="py-4 flex">
                    <img
                      className="h-20 w-20"
                      src={processing.imageUrl}
                      alt=""
                    />
                    <div className="ml-3">
                      <p className="text-lg font-medium text-gray-900">
                        {processing.name}
                      </p>
                      <p className="text-base text-gray-500">
                        {processing.description}
                      </p>
                    </div>
                    <div className="flex-grow" aria-hidden="true" />
                    <div className="flex items-center space-x-4 mr-2">
                      <button
                        className="hover:underline hover:opacity-80"
                        onClick={() => {
                          showNoti({
                            variant: 'alert',
                            title: '준비중인 기능입니다.',
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="hover:underline text-red-600 hover:text-red-800"
                        onClick={() => {
                          showModal({
                            variant: 'alert',
                            title: 'Delete Process',
                            content:
                              'Are you sure you want to delete this process? This action cannot be undone.',
                            actionButton: {
                              label: 'Delete',
                              onClick: () => {
                                setAugSteps((prev) =>
                                  prev.filter((_, idx2) => idx !== idx2),
                                );
                                closeModal();
                              },
                            },
                            cancelButton: {
                              label: 'Cancel',
                              onClick: () => {
                                closeModal();
                              },
                            },
                          });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-center md:text-left text-xl font-medium">
              Preprocessing
            </h2>
            <div className="mt-4">
              <Button
                full
                color="white"
                onClick={() => {
                  setVariant('preprocessing');
                  setTimeout(() => setShow(true), 100);
                }}
              >
                <PlusIcon className="w-6 h-6" />
                <span>Add Preprocessing Step</span>
              </Button>
            </div>
            {preSteps.length === 0 ? (
              <div className="h-80 grid place-items-center">
                No Preprocessing Steps
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {preSteps.map((processing, idx) => (
                  <li key={processing.name} className="py-4 flex">
                    <img
                      className="h-20 w-20"
                      src={processing.imageUrl}
                      alt=""
                    />
                    <div className="ml-3">
                      <p className="text-lg font-medium text-gray-900">
                        {processing.name}
                      </p>
                      <p className="text-base text-gray-500">
                        {processing.description}
                      </p>
                    </div>
                    <div className="flex-grow" aria-hidden="true" />
                    <div className="flex items-center space-x-4 mr-2">
                      <button
                        className="hover:underline hover:opacity-80"
                        onClick={() => {
                          showNoti({
                            variant: 'alert',
                            title: '준비중인 기능입니다.',
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="hover:underline text-red-600 hover:text-red-800"
                        onClick={() => {
                          showModal({
                            variant: 'alert',
                            title: 'Delete Process',
                            content:
                              'Are you sure you want to delete this process? This action cannot be undone.',
                            actionButton: {
                              label: 'Delete',
                              onClick: () => {
                                setPreSteps((prev) =>
                                  prev.filter((_, idx2) => idx !== idx2),
                                );
                                closeModal();
                              },
                            },
                            cancelButton: {
                              label: 'Cancel',
                              onClick: () => {
                                closeModal();
                              },
                            },
                          });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
      <AddProcessingModal
        show={show}
        close={() => {
          setShow(false);
          setTimeout(() => setVariant(null), 200);
        }}
        variant={variant}
        onSelect={(processing) => {
          if (variant === 'augmentation') {
            setAugSteps((prev) => [...prev, processing]);
          } else {
            setPreSteps((prev) => [...prev, processing]);
          }
          setShow(false);
          setTimeout(() => setVariant(null), 200);
        }}
      />
    </>
  );
};

const Sidebar = (
  <div className="py-4 flex flex-col">
    <h2 className="px-4 font-semibold text-xl">COCO_Aug</h2>
    <div className="mt-16 space-y-1">
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="/dataset/data">
        <span>Data</span>
      </Link>
      <Link className="flex px-4 py-2 bg-gray-200" href="/dataset/processing">
        <span>Processing</span>
      </Link>
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Stats</span>
      </Link>
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Settings</span>
      </Link>
    </div>
  </div>
);

DatasetProcessingPage.Layout = Dashboard;
DatasetProcessingPage.Sidebar = Sidebar;
export default DatasetProcessingPage;
