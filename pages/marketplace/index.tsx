import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

// components
import Dashboard from '@components/layout/Dashboard';
import ProjectList from '@components/marketplace/project/ProjectList';
import DatasetList from '@components/marketplace/dataset/DatasetList';
import ModelList from '@components/marketplace/model/ModelList';
import SectionTitle from '@components/core/SectionTitle';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import Dropdown from '@components/ui/Dropdown';

// libraries
import getSampleProjects from '@lib/getSampleProjects';
import getDatasets from '@lib/getDatasets';
import getModels from '@lib/getModels';

// icons
import { ChevronDownIcon } from '@heroicons/react/solid';
import Spinner from '@components/icons/Spinner';

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

const taskItems = [
  'img classfication',
  'object detection',
  'img multi-label claassification',
  'text pasentiment analysis',
  'text paraphrase classification',
  'text question answering',
];

const proceItems = ['all', 'free', 'Under $25', '$25 to $50', '$50 and Above'];
const MarketplacePage = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = React.useState<string>('');
  const [searchCategory, setSearchCategory] = React.useState<
    'ai' | 'dataset' | 'model'
  >('ai');

  const [category, setCategory] = React.useState<'ai' | 'dataset' | 'model'>(
    'ai',
  );
  const [projects, setProjects] = React.useState<SampleProjectInfo[] | null>(
    null,
  );
  const [datasets, setDatasets] = React.useState<DatasetInfo[] | null>(null);
  const [models, setModels] = React.useState<ModelInfo[] | null>(null);

  const totalProjects = React.useRef<SampleProjectInfo[]>([]);
  const totalDatasets = React.useRef<DatasetInfo[]>([]);
  const totalModels = React.useRef<ModelInfo[]>([]);

  const [taskFilter, setTaskFilter] = React.useState<string[]>([]);
  const [priceFilter, setPriceFilter] = React.useState<string>('all');

  React.useEffect(() => {
    if (
      projects === null &&
      router.query.category &&
      (router.query.category === 'ai' ||
        router.query.category === 'dataset' ||
        router.query.category === 'model')
    ) {
      setSearchCategory(router.query.category);
      setCategory(router.query.category);
    }
    if (projects === null)
      getSampleProjects().then((sampleProjects) => setProjects(sampleProjects));
    if (datasets === null)
      getDatasets().then((datasets) => setDatasets(datasets));
    if (models === null) getModels().then((models) => setModels(models));

    if (projects === null || datasets === null || models === null) return;

    totalProjects.current = projects;
    totalDatasets.current = datasets;
    totalModels.current = models;
  }, [router, projects, datasets, models, category]);

  //TODO: 데이터 받으면 필터링 하기
  const handleFilter = React.useCallback(() => {
    // setDatasets((prev) => {
    //   if (!taskFilter) return totalDatasets.current;
    //   return totalDatasets.current.filter(({ type }) => {
    //     let flag = false;
    //     taskFilter.map((val) => {
    //       if (val === type) flag === true;
    //     });
    //     if (flag) return true;
    //     return false;
    //   });
    // });
  }, [taskFilter]);

  const getDataArray = React.useCallback(
    async (variant: 'ai' | 'dataset' | 'model') => {
      try {
        if (variant === 'ai') setProjects(await getSampleProjects());
        else if (variant === 'dataset') setDatasets(await getDatasets());
        else setModels(await getModels());
      } catch (err) {
        console.log(err);
      }
    },
    [],
  );

  const DropdownItems = [
    { label: 'Ai', onClick: () => setSearchCategory('ai') },
    { label: 'Dataset', onClick: () => setSearchCategory('dataset') },
    { label: 'Model', onClick: () => setSearchCategory('model') },
  ];

  return (
    <div>
      <div className="fixed left-[112px] flex flex-col bg-gray-200 h-full w-72 p-2">
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
                  setSearchCategory(item.value as never);
                  getDataArray(item.value as never);
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
          {taskItems.map((item, idx) => (
            <label
              htmlFor={item}
              className={cn('flex items-center ml-2 mt-2 px-2 py-0.5', {
                'bg-gray-300 rounded-md': category === item,
                'hover:opacity-80 cursor-pointer': category !== item,
              })}
              key={`${item}-${idx}`}
            >
              <input
                type="checkBox"
                id={item}
                className="mr-2"
                checked={taskFilter.includes(item)}
                onChange={() => {
                  setTaskFilter((prev) =>
                    taskFilter.includes(item)
                      ? prev.filter((val) => val !== item)
                      : [...prev, item],
                  );
                  getDataArray(item as never);
                  handleFilter();
                }}
              />
              <p className="text-md ml-2 font-medium capitalize">{item}</p>
            </label>
          ))}
        </div>
        <div className="py-4">
          <p className="text-lg font-semibold">Price</p>
          {proceItems.map((item, idx) => (
            <label
              htmlFor={item}
              className={cn('flex items-center ml-2 mt-2 px-2 py-0.5', {
                'bg-gray-300 rounded-md': category === item,
                'hover:opacity-80 cursor-pointer': category !== item,
              })}
              key={`${item}-${idx}`}
            >
              <input
                type="radio"
                id={item}
                className="mr-2"
                checked={priceFilter === item}
                onChange={() => {
                  setPriceFilter(item);
                  // getDataArray(item as never);
                  handleFilter();
                }}
              />
              <p className="text-md ml-2 font-medium capitalize">{item}</p>
            </label>
          ))}
        </div>
      </div>
      <div className="w-full p-8 pl-80">
        <div className="w-full justify-center flex items-center">
          <Dropdown
            button={
              <div className="capitalize bg-white border-2 w-40 justify-between rounded-md mr-2 flex items-center px-4 h-[42px] mt-1">
                {searchCategory}
                <ChevronDownIcon className="w-6 h-6" />
              </div>
            }
            dropdownItems={DropdownItems}
          />
          <Input
            className="w-[600px]"
            placeholder="Search Items"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button className="mt-1 ml-2">Search</Button>
        </div>
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
