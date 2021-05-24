import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { EyeIcon, HeartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';

// contexts
import { useUI } from '@components/ui/context';

// components
import Dashboard from '@components/layout/Dashboard';
import Input from '@components/ui/Input';
import Select from '@components/ui/Select';
import Button from '@components/ui/Button';
import Link from '@components/ui/Link';

// libraries
import getModels from '@lib/getModels';
// import uploadModel from '@lib/uploadModel';

// types
import { initialModelInput, ModelInfo, ModelInput } from 'types/model';

const frameworkList = [
  {
    label: 'Select',
    value: '',
  },
  {
    label: 'Pytorch 1.8.1',
    value: 'Pytorch 1.8.1',
  },
  {
    label: 'Pytorch 1.7.1',
    value: 'Pytorch 1.7.1',
  },
  {
    label: 'Pytorch 1.6.0',
    value: 'Pytorch 1.6.0',
  },
  {
    label: 'Pytorch 1.5.1',
    value: 'Pytorch 1.5.1',
  },
  {
    label: 'Pytorch 1.4.0',
    value: 'Pytorch 1.4.0',
  },
  {
    label: 'Pytorch 1.3.1',
    value: 'Pytorch 1.3.1',
  },
  {
    label: 'Pytorch 1.2.0',
    value: 'Pytorch 1.2.0',
  },
  {
    label: 'Pytorch 1.1.0',
    value: 'Pytorch 1.1.0',
  },
  {
    label: 'Tensorflow 2.4.1',
    value: 'Tensorflow 2.4.1',
  },
  {
    label: 'Tensorflow 2.3.2',
    value: 'Tensorflow 2.3.2',
  },
  {
    label: 'Tensorflow 2.2.0',
    value: 'Tensorflow 2.2.0',
  },
  {
    label: 'Tensorflow 2.1.3',
    value: 'Tensorflow 2.1.3',
  },
  {
    label: 'Tensorflow 2.1.0',
    value: 'Tensorflow 2.1.0',
  },
];

const ModalUploadPage = () => {
  const router = useRouter();
  const [modelInput, setModelInput] = useState<ModelInput>(initialModelInput);
  const [fileInfo, setFileInfo] = useState<{
    filename: string;
    size: number;
  } | null>(null);
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { showModal, closeModal } = useUI();

  useEffect(() => {
    getModels()
      .then((models) => setModels(models.slice(0, 4)))
      .catch((err) => setError(err.message));
  }, []);

  // const handleSubmit = useCallback(
  //   async (modelInput: ModelInput) => {
  //     try {
  //       await uploadModel(modelInput);

  //       showModal({
  //         variant: 'default',
  //         title: 'Upload Completed',
  //         content: `Successfully ploaded new model '${modelInput.name}'. You can go to the detail page or go back to the list.`,
  //         actionButton: {
  //           label: 'Detils',
  //           onClick: () => {
  //             router.push('/model/jupyter');
  //             closeModal();
  //           },
  //         },
  //         cancelButton: {
  //           label: 'Back to List',
  //           onClick: () => {
  //             router.push('/model');
  //             closeModal();
  //           },
  //         },
  //       });
  //     } catch (err) {
  //       showNoti({ variant: 'alert', title: err.message });
  //     }
  //   },
  //   [showNoti, showModal, closeModal, router],
  // );

  const handleSubmit2 = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      showModal({
        variant: 'default',
        title: 'Upload Completed',
        content: `Successfully uploaded a new model. You can go to the detail page or go back to the list.`,
        actionButton: {
          label: 'Details',
          onClick: () => {
            router.push('/model/jupyter');
            closeModal();
          },
        },
        cancelButton: {
          label: 'Back to List',
          onClick: () => {
            router.push('/model');
            closeModal();
          },
        },
      });
    }, 500);
  }, [router, showModal, closeModal]);

  return (
    <div className="pb-32 lg:py-12 min-h-full flex flex-col justify-center items-stretch">
      <div className="w-full lg:grid gap-8 grid-cols-2 max-w-5xl mx-auto lg:px-16">
        <section className="md:my-8 px-4 py-6 w-full mx-auto sm:max-w-md lg:max-w-none h-[640px] md:border border-gray-300 md:rounded-md md:shadow-md md:bg-white">
          <div className="flex flex-col h-full">
            <h2 className="text-center md:text-left text-2xl font-medium">
              Upload Model
            </h2>
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept=".zip,.rar,.7zip"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];

                  if (e.target.files[0]) {
                    setFileInfo({ filename: file.name, size: file.size });
                    e.currentTarget.value = '';
                  }
                }
              }}
            />
            <Input
              containerClassName="mt-6"
              label="Model Name"
              placeholder="Model name"
              value={modelInput.name}
              onChange={(e) =>
                setModelInput((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <Select
              className="mt-6"
              label="Framework"
              items={frameworkList.map((item) => ({
                ...item,
                key: item.label,
              }))}
              selectedValue={modelInput.framework}
              onSelect={(item) =>
                setModelInput((prev) => ({
                  ...prev,
                  framework: item.value as string,
                }))
              }
            />
            <Select
              className="mt-6"
              label="Task"
              items={[
                { key: 'public', label: 'Public', value: true },
                { key: 'private', label: 'Private', value: false },
              ]}
              selectedValue={modelInput.isPublic}
              onSelect={(item) =>
                setModelInput((prev) => ({
                  ...prev,
                  isPublic: item.value as boolean,
                }))
              }
            />
            <div className="mt-6">
              <Button
                size="sm"
                color="white"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose Folder (zip)
              </Button>
            </div>
            <div className="mt-6 space-y-2">
              <p>Selected: {fileInfo?.filename}</p>
              <p>
                Size:{' '}
                {fileInfo ? `${fileInfo?.size.toLocaleString()} Bytes` : ''}
              </p>
            </div>
            <div className="flex-grow hidden md:block" aria-hidden="true" />
            <div className="mt-6 flex justify-end space-x-4">
              <Button color="white" onClick={() => router.back()}>
                Back
              </Button>
              <Button
                onClick={() => {
                  // handleSubmit(modelInput);
                  handleSubmit2();
                }}
                // disabled={
                //   !modelInput.name ||
                //   !modelInput.framework ||
                //   !fileInfo ||
                //   loading
                // }
              >
                Upload
              </Button>
            </div>
          </div>
        </section>
        <section className="md:my-8 px-4 py-6 w-full mx-auto sm:max-w-md lg:max-w-none h-[640px] md:border border-gray-300 md:rounded-md md:shadow-md md:bg-white">
          <div className="flex flex-col h-full">
            <h2 className="text-center md:text-left text-2xl font-medium">
              Browse AI Model
            </h2>
            <p className="mt-2 text-center md:text-left text-gray-600 font-medium">
              Choose state-of-the-art AI model
            </p>
            {error ? (
              <div className="flex-grow text-center">{error}</div>
            ) : (
              <div className="flex-grow py-6 grid grid-cols-2 gap-4">
                {models.map((model, idx) => (
                  <Link
                    key={model._id}
                    className="rounded-md overflow-hidden shadow-md group flex flex-col"
                    href="/model/jupyter"
                  >
                    <div className="relative aspect-w-16 aspect-h-7 overflow-hidden">
                      <img
                        className="object-cover transform duration-300 transition-transform group-hover:scale-110"
                        src={`/images/model/img${idx + 1}.jpg`}
                        loading="lazy"
                      />
                    </div>
                    <div className="px-4 flex-grow">
                      <h5 className="mt-2 pb-2 text-center font-semibold border-b-2 border-gray-300">
                        {model.name}
                      </h5>
                      <p className="mt-2 text-sm truncate">{model.framework}</p>
                      <div className="mt-1.5 flex space-x-3 text-gray-500 text-sm">
                        <div className="flex items-center space-x-1">
                          <EyeIcon className="w-5 h-5" />
                          <span>{model.watch.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <StarIcon className="w-5 h-5" />
                          <span>{model.star.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 py-1.5 flex justify-between items-center px-4">
                      <HeartIcon className="w-5 h-5 text-red-400" />
                      <span className="text-sm">Free</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div>
              <Link
                className="float-right text-lightBlue-400 hover:underline hover:opacity-70"
                href="/marketplace?sort=model"
                as="/marketplace"
              >
                Browse all AI models &gt;
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

ModalUploadPage.Layout = Dashboard;
export default ModalUploadPage;
