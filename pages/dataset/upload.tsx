import React from 'react';
import { useRouter } from 'next/router';

// componsnts
import Dashboard from '@components/layout/Dashboard';
import Dropdown from '@components/ui/Dropdown';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import DatasetCard from '@components/dataset/DatasetCard';

// libs
import getDatasets from '@lib/getDatasets';

// icons
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Spinner from '@components/icons/Spinner';

const DatasetUploadPage = () => {
  const router = useRouter();
  const DropdownItem = [
    { label: 'local', value: 'local', onClick: () => setVariant('local') },
  ];
  const DropdownType = [
    { label: 'image', value: 'image', onClick: () => setType('image') },
    { label: 'image2', value: 'image2', onClick: () => setType('image2') },
    { label: 'image3', value: 'image3', onClick: () => setType('image3') },
  ];

  const DropdownTask = [
    {
      label: 'classification',
      value: 'classification',
      onClick: () => setType('classification'),
    },
    {
      label: 'classification2',
      value: 'classification2',
      onClick: () => setType('classification2'),
    },
    {
      label: 'classification3',
      value: 'classification3',
      onClick: () => setType('classification3'),
    },
  ];

  const [loading, setLoading] = React.useState<boolean>(false);
  const [datasets, setDatasets] = React.useState<DatasetInfo[] | null>(null);
  const [variant, setVariant] = React.useState<string>('local');
  const [type, setType] = React.useState<string>('image1');
  const [datasetName, setDatasetName] = React.useState<string>('');
  const [task, setTask] = React.useState<string>('classification');

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
    <div className="px-4 mt-8 mx-auto max-w-screen-xl">
      <h1 className="text-3xl font-medium">Upload Dataset</h1>
      <div className="mt-8 md:grid grid-cols-2 gap-8 space-y-6 md:space-y-0 max-w-md md:max-w-none mx-auto">
        <section className="min-h-[600px] p-4 bg-white rounded-lg shadow-md">
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
                  className="w-96"
                  type="text"
                  placeholder="Input Template Name"
                  value={datasetName}
                  onChange={(e) => setDatasetName(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="mt-4 mb-2">Data Type</p>
                  <Dropdown
                    dropdownItems={DropdownType}
                    button={
                      <div className="capitalize flex text-lg items-center w-[200px] justify-between p-2 rounded-md border-gray-300 border">
                        <p className="text-sm">{type}</p>
                        <ChevronDownIcon className="w-6 h-6" />
                      </div>
                    }
                  />
                </div>

                <div>
                  <p className="mt-4 mb-2">Task</p>
                  <Dropdown
                    dropdownItems={DropdownTask}
                    button={
                      <div className="capitalize flex text-lg items-center w-[200px] justify-between p-2 rounded-md border-gray-300 border">
                        <p className="text-sm">{task}</p>
                        <ChevronDownIcon className="w-6 h-6" />
                      </div>
                    }
                  />
                </div>
              </div>
              <div className="space-y-8 mt-4">
                <Button>Choose Folder (zip)</Button>

                <p className="text-lg text-gray-600">Selected:</p>
                <p className="text-lg text-gray-600">Size: </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    router.push('/dataset/data');
                  }, 2000);
                }}
                className="w-28 mr-4"
              >
                Upload
              </Button>

              <Button onClick={() => router.back()} className="w-28">
                Back
              </Button>
            </div>
          </div>
        </section>
        <section className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-medium">Browse Dataset</h1>
          <p className="text-sm mt-2 text-gray-500">
            Choose public/private dataset
          </p>
          <div className="grid grid-cols-2">
            {datasets.slice(0, 4).map((dataset, idx) => (
              <DatasetCard key={dataset._id} dataset={dataset} idx={idx} />
            ))}
          </div>
          <button className="mt-2 w-full flex items-center justify-end text-lightBlue-500 hover:opacity-80">
            <p className="text-xl">Browse All Datasets</p>
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </section>
      </div>
    </div>
  );
};

DatasetUploadPage.Layout = Dashboard;
export default DatasetUploadPage;
