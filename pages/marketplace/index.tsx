import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useDebounce } from 'react-use';

// components
import Dashboard from '@components/layout/Dashboard';
import ProjectList from '@components/marketplace/project/ProjectList';
import DatasetList from '@components/marketplace/dataset/DatasetList';
import ModelList from '@components/marketplace/model/ModelList';
import SectionTitle from '@components/core/SectionTitle';
import Input from '@components/ui/Input';

// libraries
import getSampleProjects from '@lib/ai/getSampleProjects';
import getDatasets from '@lib/dataset/getDatasets';
import getModels from '@lib/model/getModels';

// icons
import Spinner from '@components/icons/Spinner';
import { ChevronRightIcon, XIcon } from '@heroicons/react/outline';

// types
import { SampleProjectInfo } from 'types/project';
import { DatasetInfo } from 'types/dataset';
import { ModelInfo } from 'types/model';
import { Disclosure } from '@headlessui/react';

const categoryItems = [
  {
    name: 'Ai',
    value: 'ai',
    image: '/icon/project.png',
  },
  {
    name: 'Dataset',
    value: 'dataset',
    image: '/icon/dataset.png',
  },
  {
    name: 'Model',
    value: 'model',
    image: '/icon/model.png',
  },
];

const TEXT_TASK = [
  'Sentiment Classification',
  'Translation',
  'Paraphrase Classification',
  'Question Answering',
];

const IMAGE_TASK = [
  'Classification',
  'Multi-label Classification',
  'Object Detection',
];

const PRICE_ITEMS = [
  'all',
  'free',
  'Under $25',
  '$25 to $50',
  '$50 and Above',
] as const;

const CATEGORY = ['ai', 'dataset', 'model'] as const;

const MarketplacePage = () => {
  const router = useRouter();

  const categoryItem = React.useMemo(() => {
    if (
      router.query.category === 'ai' ||
      router.query.category === 'dataset' ||
      router.query.category === 'model'
    )
      return router.query.category;
    return 'ai';
  }, [router]);

  const [searchInput, setSearchInput] = React.useState<string>('');
  const [category, setCategory] = React.useState<typeof CATEGORY[number]>(
    CATEGORY[0],
  );
  const [projects, setProjects] = React.useState<SampleProjectInfo[] | null>(
    null,
  );
  const [datasets, setDatasets] = React.useState<DatasetInfo[] | null>(null);
  const [models, setModels] = React.useState<ModelInfo[] | null>(null);

  const totalProjects = React.useRef<SampleProjectInfo[]>([]);
  const totalDatasets = React.useRef<DatasetInfo[]>([]);
  const totalModels = React.useRef<ModelInfo[]>([]);

  const [taskFilter, setTaskFilter] = React.useState<
    typeof TEXT_TASK | typeof IMAGE_TASK
  >([]);

  const [priceFilter, setPriceFilter] = React.useState<
    typeof PRICE_ITEMS[number]
  >(PRICE_ITEMS[0]);

  React.useEffect(() => {
    if (
      router.query.category &&
      (router.query.category === 'ai' ||
        router.query.category === 'dataset' ||
        router.query.category === 'model')
    ) {
      if (
        router.query.searchInput &&
        typeof router.query.searchInput === 'string'
      )
        setSearchInput(router.query.searchInput);
      setCategory(router.query.category);
    }
    getSampleProjects().then((sampleProjects) => {
      totalProjects.current = sampleProjects;
      setProjects(sampleProjects);
    });
    getDatasets().then((datasets) => {
      totalDatasets.current = datasets;
      setDatasets(datasets);
    });
    getModels().then((models) => {
      totalModels.current = models;
      setModels(models);
    });
  }, [router]);

  const changeTaskFilter = useCallback((tasks: string[]) => {
    if (tasks.length === 0) return setProjects(totalProjects.current);

    setProjects((prev) =>
      prev === null
        ? totalProjects.current
        : prev.filter((project) => tasks.includes(project.task)),
    );
  }, []);

  React.useEffect(() => {
    changeTaskFilter(taskFilter);
  }, [taskFilter, changeTaskFilter]);

  useDebounce(
    () => {
      setProjects(() => totalProjects.current);
      setDatasets(() => totalDatasets.current);
      setModels(() => totalModels.current);

      setProjects((prev) => {
        if (prev === null) return null;
        if (!searchInput) return totalProjects.current;
        return prev.filter(({ name }) => name.includes(searchInput));
      });
      setDatasets((prev) => {
        if (prev === null) return null;
        if (!searchInput) return totalDatasets.current;
        return prev.filter(({ name }) => name.includes(searchInput));
      });
      setModels((prev) => {
        if (prev === null) return null;
        if (!searchInput) return totalModels.current;
        return prev.filter(({ name }) => name.includes(searchInput));
      });
    },
    1000,
    [searchInput, category],
  );

  return (
    <div>
      <div className="fixed overflow-y-auto left-[112px] flex flex-col bg-gray-200 h-full w-72 p-2">
        <div className="py-4">
          <p className="text-lg font-semibold">Category</p>
          {categoryItems.map((item, idx) => (
            <label
              htmlFor={item.value}
              className={cn('flex items-center ml-2 mt-2 px-2 py-0.5', {
                'bg-gray-300 rounded-md': category === item.value,
                'hover:opacity-80 cursor-pointer': category !== item.value,
              })}
              key={`${item.name}-${idx}`}
            >
              <input
                type="radio"
                id={item.value}
                className="mr-4"
                checked={category === item.value}
                onChange={() => {
                  setCategory(item.value as never);
                }}
              />
              <img src={item.image} width="28" height="28" />
              <p className="text-md ml-2 font-medium">{item.name}</p>
            </label>
          ))}
        </div>
        <div className="py-4">
          <p className="text-lg font-semibold">Task</p>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="py-2 flex items-center">
                  <ChevronRightIcon
                    className={cn('w-4 h-4 mr-2', {
                      'transform rotate-90': open,
                    })}
                  />
                  Image
                </Disclosure.Button>
                <Disclosure.Panel>
                  {IMAGE_TASK.map((item, idx) => (
                    <label
                      htmlFor={item}
                      className={cn(
                        'flex items-center ml-2 mt-2 px-2 py-0.5 cursor-pointer',
                      )}
                      key={`${item}-${idx}`}
                    >
                      <input
                        type="checkBox"
                        id={item}
                        className="mr-2 cursor-pointer"
                        checked={taskFilter.includes(item)}
                        onChange={() => {
                          setTaskFilter((prev) =>
                            taskFilter.includes(item)
                              ? prev.filter((val) => val !== item)
                              : [...prev, item],
                          );
                        }}
                      />
                      <p className="text-md ml-2 font-medium">{item}</p>
                    </label>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="py-2 flex items-center">
                  <ChevronRightIcon
                    className={cn('w-4 h-4 mr-2', {
                      'transform rotate-90': open,
                    })}
                  />
                  Text
                </Disclosure.Button>
                <Disclosure.Panel>
                  {TEXT_TASK.map((item, idx) => (
                    <label
                      htmlFor={item}
                      className={cn(
                        'flex items-center ml-2 mt-2 px-2 py-0.5 cursor-pointer',
                      )}
                      key={`${item}-${idx}`}
                    >
                      <input
                        type="checkBox"
                        id={item}
                        className="mr-2 cursor-pointer"
                        checked={taskFilter.includes(item)}
                        onChange={() => {
                          setTaskFilter((prev) =>
                            taskFilter.includes(item)
                              ? prev.filter((val) => val !== item)
                              : [...prev, item],
                          );
                        }}
                      />
                      <p className="text-md ml-2 font-medium">{item}</p>
                    </label>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <div className="py-4">
          <p className="text-lg font-semibold">Price</p>
          {PRICE_ITEMS.map((item, idx) => (
            <label
              htmlFor={item}
              className={cn('flex items-center ml-2 mt-2 px-2 py-0.5')}
              key={`${item}-${idx}`}
            >
              <input
                type="radio"
                id={item}
                className="mr-2"
                checked={priceFilter === item}
                onChange={() => {
                  setPriceFilter(item);
                }}
              />
              <p className="text-md ml-2 font-medium capitalize">{item}</p>
            </label>
          ))}
        </div>
      </div>
      <div className="w-full p-8 pl-80">
        <div className="mt-8">
          <SectionTitle
            picture={
              category === 'ai'
                ? '/icon/project.png'
                : category === 'dataset'
                ? '/icon/dataset.png'
                : '/icon/model.png'
            }
            title={category ? category.toUpperCase() : ''}
            className="mb-8"
          />
          <div className="flex ml-6 relative items-center">
            <Input
              className="w-[600px]"
              placeholder="Search Items"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button
                className="absolute left-[570px] "
                onClick={() => {
                  setSearchInput('');
                }}
              >
                <XIcon className="w-5 h-5 text-gray-700" />
              </button>
            )}
          </div>
          {category === 'ai' &&
            (projects ? (
              <ProjectList projects={projects} />
            ) : (
              <div className="h-[404px] flex justify-center items-center">
                <Spinner className="w-12 h-12 animate-spin" />
              </div>
            ))}
          {category === 'dataset' &&
            (datasets ? (
              <DatasetList datasets={datasets} />
            ) : (
              <div className="h-[404px] flex justify-center items-center">
                <Spinner className="w-12 h-12 animate-spin" />
              </div>
            ))}
          {category === 'model' &&
            (models ? (
              <ModelList models={models} />
            ) : (
              <div className="h-[404px] flex justify-center items-center">
                <Spinner className="w-12 h-12 animate-spin" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

MarketplacePage.Layout = Dashboard;
export default MarketplacePage;
