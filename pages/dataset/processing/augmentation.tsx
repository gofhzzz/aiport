import React, { useState } from 'react';
import { useRouter } from 'next/router';

// contexts
import { useUI } from '@components/ui/context';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';
import Button from '@components/ui/Button';
import AddProcessingModal from '@components/modals/AddProcessingModal';

// libs
import getProcessing from '@lib/processing/getProcessing';
import uploadProcessing from '@lib/processing/uploadProcessing';

// icons
import { PlusIcon } from '@heroicons/react/outline';
import Spinner from '@components/icons/Spinner';

// types
import { ProcessingStep } from 'types/processing';

const DatasetProcessingPage = () => {
  const router = useRouter();
  const [template, setTemplate] = useState<{
    name: string;
    type: string;
  } | null>(null);
  const [augIndex, setAugIndex] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [variant, setVariant] = useState<
    'augmentation' | 'preprocessing' | null
  >(null);

  const [preprocessing, setPreprocessing] = React.useState<ProcessingStep[]>(
    [],
  );
  const [augmentations, setAugmentations] = React.useState<ProcessingStep[][]>([
    [],
  ]);

  const { showNoti, showModal, closeModal } = useUI();

  React.useEffect(() => {
    if (
      router.query.processingId &&
      typeof router.query.processingId === 'string'
    ) {
      getProcessing(router.query.processingId).then((processing) => {
        setTemplate({
          name: processing.templateName,
          type: processing.templateType,
        });
        setAugmentations(processing.augmentations);
        setPreprocessing(processing.preprocessing);
      });
    } else if (
      router.query.name &&
      typeof router.query.name === 'string' &&
      router.query.type &&
      typeof router.query.type === 'string'
    )
      setTemplate({ name: router.query.name, type: router.query.type });
  }, [router]);

  const handleSave = React.useCallback(async () => {
    try {
      if (!template) throw new Error('No Template Info');

      uploadProcessing(augmentations, preprocessing, template);
      showModal({
        title: 'Save succeed',
        content: 'It has been added to your Processing Page',
        actionButton: {
          label: 'Go to my processing',
          onClick: () => {
            router.push('/dataset/processing');
            closeModal();
          },
        },
        cancelButton: {
          label: 'Stay in this page',
          onClick: () => closeModal(),
        },
      });
    } catch (err) {
      showNoti({ variant: 'alert', title: err.message });
    }
  }, [
    showNoti,
    showModal,
    closeModal,
    router,
    preprocessing,
    augmentations,
    template,
  ]);

  if (template === null)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );

  return (
    <>
      <div className="mx-auto max-w-screen-xl pt-8 px-4 md:px-6 pb-16">
        <h1 className="text-3xl font-medium">Processing</h1>
        <p className="text-gray-600">
          {template.name}
          &#62; {template.type}
        </p>
        <div className="mt-8 gap-8 space-y-6 md:space-y-0 max-w-md md:max-w-none mx-auto">
          <section className="p-4 bg-white rounded-lg shadow-md mb-4">
            <div className="flex items-center">
              <h2 className="text-center md:text-left text-xl font-medium">
                Augmentation
              </h2>

              <Button
                full
                className="w-20 ml-4"
                onClick={() => {
                  setAugmentations((prev) => [...prev, []]);
                  // setVariant('augmentation');
                  // setTimeout(() => setShow(true), 100);
                }}
              >
                <PlusIcon className="w-6 h-6" />
                <span>Add</span>
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              You can add multiple Augmentation step. Each step will only
              increase the size of training data by multiple of original number
              of training data.
            </p>
            <div className="flex flex-col mt-8">
              {augmentations.map((augmentation, idx) => (
                <div key={idx} className="flex mb-12 items-center">
                  <button
                    onClick={() => {
                      setAugIndex(idx);
                      setVariant('augmentation');
                      setTimeout(() => setShow(true), 100);
                    }}
                    className="rounded-full w-10 h-10 flex items-center justify-center mr-4 border-2 border-gray-400"
                  >
                    <PlusIcon className="w-6 h-6" />
                  </button>
                  {augmentation.length === 0 ? (
                    <div className="grid place-items-center">
                      No Augmentation Steps
                    </div>
                  ) : (
                    <ul className="flex">
                      {augmentation.map((processing) => (
                        <li key={processing.name} className="flex mr-2">
                          <img
                            className="h-20 w-20"
                            src={processing.imageUrl}
                            alt=""
                          />
                          <div>
                            <div className="ml-3">
                              <p className="text-lg font-medium text-gray-900">
                                {processing.name}
                              </p>
                              <p className="text-base text-gray-500">
                                {processing.description}
                              </p>
                            </div>
                            <div className="flex-grow" aria-hidden="true" />
                            <div className="flex items-center space-x-4 mr-6">
                              <button
                                className="hover:underline hover:opacity-80 ml-3"
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
                                  // showModal({
                                  //   variant: 'alert',
                                  //   title: 'Delete Process',
                                  //   content:
                                  //     'Are you sure you want to delete this process? This action cannot be undone.',
                                  //   actionButton: {
                                  //     label: 'Delete',
                                  //     onClick: () => {
                                  //       setAugSteps((prev) =>
                                  //         prev.filter(
                                  //           (_, idx2) => idx !== idx2,
                                  //         ),
                                  //       );
                                  //       closeModal();
                                  //     },
                                  //   },
                                  //   cancelButton: {
                                  //     label: 'Cancel',
                                  //     onClick: () => {
                                  //       closeModal();
                                  //     },
                                  //   },
                                  // });
                                  showNoti({
                                    variant: 'alert',
                                    title: '준비중인 기능입니다.',
                                  });
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="p-4 bg-white rounded-lg shadow-md mb-4">
            <div className="flex items-center">
              <h2 className="text-center md:text-left text-xl font-medium">
                Preprocessing
              </h2>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              You can add multiple Augmentation step. Each step will only
              increase the size of training data by multiple of original number
              of training data.
            </p>
            <div className="flex flex-col mt-8">
              <div className="flex mb-12 items-center">
                <button className="rounded-full w-10 h-10 flex items-center justify-center mr-4 border-2 border-gray-400">
                  <PlusIcon
                    className="w-6 h-6"
                    onClick={() => {
                      setVariant('preprocessing');
                      setTimeout(() => setShow(true), 100);
                    }}
                  />
                </button>
                {preprocessing.length === 0 ? (
                  <div className="grid place-items-center">
                    No preprocessing Steps
                  </div>
                ) : (
                  <ul className="flex">
                    {preprocessing.map((processing) => (
                      <li key={processing.name} className="flex mr-2">
                        <img
                          className="h-20 w-20"
                          src={processing.imageUrl}
                          alt=""
                        />
                        <div>
                          <div className="ml-3">
                            <p className="text-lg font-medium text-gray-900">
                              {processing.name}
                            </p>
                            <p className="text-base text-gray-500">
                              {processing.description}
                            </p>
                          </div>
                          <div className="flex-grow" aria-hidden="true" />
                          <div className="flex items-center space-x-4 mr-6">
                            <button
                              className="hover:underline hover:opacity-80 ml-3"
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
                                showNoti({
                                  variant: 'alert',
                                  title: '준비중인 기능입니다.',
                                });
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
          <div className="pt-4 text-right">
            <Button onClick={() => handleSave()}>Save</Button>
            <Button
              className="ml-4"
              onClick={() =>
                showNoti({ title: '준비중인 기능입니다.', variant: 'alert' })
              }
            >
              Save As
            </Button>

            <Link href="/dataset/processing">
              <Button className="ml-4">New</Button>
            </Link>
          </div>
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
            setAugmentations((prev) =>
              prev.map((val, idx) => {
                if (idx === augIndex) return [...val, processing];
                return val;
              }),
            );
          } else {
            setPreprocessing((prev) => [...prev, processing]);
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
    <h2 className="px-4 font-semibold text-xl">CIFAR10</h2>
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
