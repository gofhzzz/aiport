import React from 'react';
import cn from 'classnames';

// componsnts
import Link from '@components/ui/Link';
import Dashboard from '@components/layout/Dashboard';
import Dropdown from '@components/ui/Dropdown';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import DatasetCard from '@components/dataset/DatasetCard';
import Select from '@components/ui/Select';
import { useUI } from '@components/ui/context';

// libs
import getDatasets from '@lib/dataset/getDatasets';
import getProcessings from '@lib/processing/getProcessings';

// icons
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Spinner from '@components/icons/Spinner';

// types
import { DatasetInfo } from 'types/dataset';
import { Processing } from 'types/processing';
import { Disclosure } from '@headlessui/react';

const PROCESSING_TYPE = [
  'audio',
  'image',
  'tabular',
  'text',
  'signal',
  'time-series',
  'video',
];

const ProcessingPage = () => {
  const DropdownItem = [
    { label: 'new', value: 'new', onClick: () => setVariant('new') },
    { label: 'load', value: 'load', onClick: () => setVariant('load') },
  ];
  const { showNoti } = useUI();
  const [datasets, setDatasets] = React.useState<DatasetInfo[] | null>(null);
  const [variant, setVariant] = React.useState<'new' | 'load'>('new');
  const [templateName, setTemplateName] = React.useState<string>('');
  const [type, setType] = React.useState<typeof PROCESSING_TYPE[number]>(
    PROCESSING_TYPE[0],
  );
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
    <div className="pb-32 lg:py-12 min-h-full flex flex-col justify-center items-stretch">
      <h1 className="max-w-2xl min-w-[1024px] mx-auto text-left text-3xl font-medium">
        Processing
      </h1>
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
                {PROCESSING_TYPE.map((processing) => (
                  <Disclosure key={processing}>
                    {({ open }) => (
                      <div className="mb-2">
                        <Disclosure.Button className="flex items-center">
                          <ChevronRightIcon
                            className={cn('w-4 h-4 mr-2', {
                              'transform rotate-90': open,
                            })}
                          />
                          <p className="text-xl font-semibold capitalize">
                            {processing}
                          </p>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          {open &&
                            processings.map((item) => {
                              if (item.templateType === processing)
                                return (
                                  <div className="pl-6" key={item._id}>
                                    <button
                                      onClick={() => {
                                        setSelectedTemplate(item);
                                      }}
                                      className={cn('flex', {
                                        'text-lightBlue-400':
                                          selectedTemplate?._id === item._id,
                                      })}
                                    >
                                      <p>{item.templateName}</p>
                                    </button>
                                  </div>
                                );
                            })}
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
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
                <Select
                  className="mt-6"
                  label="Data Type"
                  items={PROCESSING_TYPE.map((type) => ({
                    label: type,
                    value: type,
                    key: type,
                  }))}
                  selectedValue={type}
                  onSelect={(item) => setType(item.value as string)}
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
    <h2 className="px-4 font-semibold text-xl">CelebA</h2>
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
