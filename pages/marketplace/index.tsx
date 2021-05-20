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

const CategoryItems = [
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

  React.useEffect(() => {
    if (
      router.query.category &&
      (router.query.category === 'ai' ||
        router.query.category === 'dataset' ||
        router.query.category === 'model')
    ) {
      setSearchCategory(router.query.category);
      setCategory(router.query.category);
      if (router.query.category === 'ai')
        getSampleProjects().then((sampleProjects) =>
          setProjects(sampleProjects),
        );
      else if (router.query.category === 'dataset')
        getDatasets().then((datasets) => setDatasets(datasets));
      else getModels().then((models) => setModels(models));
    } else {
      getSampleProjects().then((sampleProjects) => setProjects(sampleProjects));
    }
  }, [router]);

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
          {CategoryItems.map((item, idx) => (
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
              <p className="text-xl ml-2 font-medium">{item.name}</p>
            </label>
          ))}
        </div>
      </div>
      <div className="w-full p-8 pl-80">
        <div className="w-full justify-center flex items-center">
          <Dropdown
            button={
              <div className="capitalize border-2 w-40 justify-between rounded-md mr-2 flex items-center px-4 h-[42px] mt-1">
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
            title={category.toUpperCase()}
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
