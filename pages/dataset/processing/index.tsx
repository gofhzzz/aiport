import React from 'react';
import cn from 'classnames';

// componsnts
import Link from '@components/ui/Link';
import Dashboard from '@components/layout/Dashboard';
import Dropdown from '@components/ui/Dropdown';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import DatasetCard from '@components/dataset/DatasetCard';

// libs
import getDatasets from '@lib/getDatasets';
import getProcessings from '@lib/getProcessings';

// icons
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Spinner from '@components/icons/Spinner';

const ProcessingPage = () => {
  const DropdownItem = [
    { label: 'new', value: 'new', onClick: () => setVariant('new') },
    { label: 'load', value: 'load', onClick: () => setVariant('load') },
  ];
  const DropdownType = [
    { label: 'image1', value: 'image1', onClick: () => setType('image1') },
    { label: 'image2', value: 'image2', onClick: () => setType('image2') },
    { label: 'image3', value: 'image3', onClick: () => setType('image3') },
  ];

  const [datasets, setDatasets] = React.useState<DatasetInfo[] | null>(null);
  const [variant, setVariant] = React.useState<'new' | 'load'>('new');
  const [templateName, setTemplateName] = React.useState<string>('');
  const [type, setType] = React.useState<string>('image1');
  const [processings, setProcessings] = React.useState<Processing[] | null>(
    null,
  );
  const [
    selectedTemplate,
    setSelectedTemplate,
  ] = React.useState<Processing | null>(null);

  React.useEffect(() => {
    getProcessings()
      .then((processings) => setProcessings(processings))
      .catch((err) => console.log(err));

    getDatasets()
      .then((datasets) => setDatasets(datasets))
      .catch((err) => console.log(err));
  }, []);

  if (datasets === null || processings === null)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );

  return (
    <div className="px-4 mt-8 mx-auto max-w-screen-xl">
      <h1 className="text-3xl font-medium">Processing</h1>
      <div className="mt-8 md:grid grid-cols-2 gap-8 space-y-6 md:space-y-0 max-w-md md:max-w-none mx-auto">
        <section className="min-h-[600px] p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium capitalize">
              {variant} Template
            </h1>
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
          {variant === 'load' ? (
            <div className="flex flex-col justify-between h-full py-8">
              <div>
                {processings.map((processing) => (
                  <div key={processing._id}>
                    <button
                      onClick={() => {
                        setSelectedTemplate(processing);
                      }}
                      className={cn('flex', {
                        'text-lightBlue-400':
                          selectedTemplate?.templateName ===
                          processing.templateName,
                      })}
                    >
                      <ChevronRightIcon className="w-6 h-6" />
                      <p>{processing.templateName}</p>
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-lg font-semibold py-4">
                  Selected Template: {selectedTemplate?.templateName}
                </p>
                <div className="flex justify-end">
                  <Link
                    href={`/dataset/processing/augmentation?processingId=${selectedTemplate?._id}`}
                  >
                    <Button className="mr-4">Load</Button>
                  </Link>
                  <Button>Back</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full pb-8">
              <div>
                <div className="mt-8">
                  <p className="my-2">Template Name</p>
                  <Input
                    type="text"
                    placeholder="Input Template Name"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                  />
                </div>
                <p className="mt-4 mb-2">Data Type</p>
                <Dropdown
                  dropdownItems={DropdownType}
                  button={
                    <div className="flex text-lg items-center w-[200px] justify-between p-2 rounded-md border-gray-300 border">
                      <p className="text-sm">{type}</p>
                      <ChevronDownIcon className="w-6 h-6" />
                    </div>
                  }
                />
              </div>
              <Link
                href={`/dataset/processing/augmentation?name=${templateName}&type=${type}`}
              >
                <Button>Create Template</Button>
              </Link>
            </div>
          )}
        </section>
        <section className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-medium">Browse Processing Template</h1>
          <p className="text-sm mt-2 text-gray-500">
            Choose processing templates
          </p>
          <div className="grid grid-cols-2">
            {datasets.slice(0, 4).map((dataset, idx) => (
              <DatasetCard key={dataset._id} dataset={dataset} idx={idx} />
            ))}
          </div>
          <button className="mt-2 w-full flex items-center justify-end text-lightBlue-500 hover:opacity-80">
            <p className="text-xl">Browse All Template</p>
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </section>
      </div>
    </div>
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

ProcessingPage.Layout = Dashboard;
ProcessingPage.Sidebar = Sidebar;
export default ProcessingPage;
