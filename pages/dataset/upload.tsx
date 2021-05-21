import React from 'react';
import { useRouter } from 'next/router';

// componsnts
import Dashboard from '@components/layout/Dashboard';
import Dropdown from '@components/ui/Dropdown';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import DatasetCard from '@components/dataset/DatasetCard';
import { useUI } from '@components/ui/context';

// libs
import getDatasets from '@lib/getDatasets';

// icons
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Spinner from '@components/icons/Spinner';
import Select from '@components/ui/Select';

const selectTypes = [
  { label: 'image', value: 'image' },
  { label: 'image2', value: 'image2' },
  { label: 'image3', value: 'image3' },
];

const selectTasks = [
  {
    label: 'classification',
    value: 'classification',
  },
  {
    label: 'classification2',
    value: 'classification2',
  },
  {
    label: 'classification3',
    value: 'classification3',
  },
];

const DatasetUploadPage = () => {
  const router = useRouter();
  const DropdownItem = [
    { label: 'local', value: 'local', onClick: () => setVariant('local') },
  ];
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [fileInfo, setFileInfo] = React.useState<{
    filename: string;
    size: number;
  } | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [datasets, setDatasets] = React.useState<DatasetInfo[] | null>(null);
  const [variant, setVariant] = React.useState<string>('local');
  const [type, setType] = React.useState<string>('image1');
  const [datasetName, setDatasetName] = React.useState<string>('');
  const [task, setTask] = React.useState<string>('classification');
  const { showNoti } = useUI();

  React.useEffect(() => {
    getDatasets()
      .then((datasets) => setDatasets(datasets))
      .catch((err) => console.log(err));
  }, []);

  if (datasets === null)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );

  if (loading)
    return (
      <div className="h-full flex justify-center items-center">
        <span className="pr-4">Loading...</span>
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );

  return (
    <div className="pb-32 lg:py-12 min-h-full flex flex-col justify-center items-stretch">
      <h1 className="max-w-2xl min-w-[1024px] mx-auto text-left text-3xl font-medium">
        Upload Dataset
      </h1>
      <div className="w-full lg:grid gap-8 grid-cols-2 max-w-5xl mx-auto lg:px-16">
        <section className="md:my-8 px-4 py-6 w-full mx-auto sm:max-w-md lg:max-w-none h-[640px] md:border border-gray-300 md:rounded-md md:shadow-md md:bg-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium capitalize">New Dataset</h1>
            <Dropdown
              dropdownItems={DropdownItem}
              button={
                <div className="flex text-lg items-center">
                  {variant}
                  <ChevronDownIcon className="w-6 h-6" />
                </div>
              }
            />
          </div>

          <div className="flex flex-col justify-between h-full pb-8">
            <div>
              <div className="mt-8">
                <p className="my-2">Dataset Name</p>
                <Input
                  type="text"
                  placeholder="Input Template Name"
                  value={datasetName}
                  onChange={(e) => setDatasetName(e.target.value)}
                />
              </div>

              <Select
                className="mt-6"
                label="Data Type"
                items={selectTypes.map((type) => ({
                  ...type,
                  key: type.label,
                }))}
                selectedValue={type}
                onSelect={(item) => setType(item.value as string)}
              />

              <Select
                className="mt-6"
                label="Task"
                items={selectTasks.map((task) => ({
                  ...task,
                  key: task.label,
                }))}
                selectedValue={task}
                onSelect={(item) => setTask(item.value as string)}
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
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button color="white" onClick={() => router.back()}>
                Back
              </Button>
              <Button
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    router.push('/dataset/data');
                  }, 2000);
                }}
                // disabled={!datasetName || !fileInfo || loading}
              >
                Upload
              </Button>
            </div>
          </div>
        </section>
        <section className="md:my-8 px-4 py-6 w-full mx-auto sm:max-w-md lg:max-w-none h-[640px] md:border border-gray-300 md:rounded-md md:shadow-md md:bg-white">
          <h1 className="text-xl font-medium">Browse Dataset</h1>
          <p className="text-sm mt-2 text-gray-500">
            Choose public/private dataset
          </p>
          <div className="flex-grow py-6 grid grid-cols-2 gap-4">
            {datasets.slice(0, 4).map((dataset, idx) => (
              <DatasetCard key={dataset._id} dataset={dataset} idx={idx} />
            ))}
          </div>
          <button
            onClick={() =>
              showNoti({ title: '준비중인 기능입니다', variant: 'alert' })
            }
            className="mt-2 w-full flex items-center justify-end text-lightBlue-500 hover:opacity-80"
          >
            <p className="text-xl">Browse All Datasets</p>
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </section>
      </div>
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
    </div>
  );
};

DatasetUploadPage.Layout = Dashboard;
export default DatasetUploadPage;
