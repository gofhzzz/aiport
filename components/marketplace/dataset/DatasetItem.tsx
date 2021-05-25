import React from 'react';
import { EyeIcon, StarIcon } from '@heroicons/react/solid';
import {
  ChartSquareBarIcon,
  CurrencyDollarIcon,
  HeartIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';

// components
import Link from '@components/ui/Link';

// types
import { DatasetInfo } from 'types/dataset';

interface Props {
  className?: string;
  dataset: DatasetInfo;
}

const DatasetItem = ({ dataset, className }: Props) => {
  return (
    <div className={className}>
      <Link
        href={`/marketplace/dataset?id=${dataset._id}`}
        className="flex hover:bg-gray-200 rounded-md p-2 cursor-pointer"
      >
        <div>
          <div className="relative w-40 pt-[100%]">
            <img
              src={dataset.src}
              className="absolute w-full h-full inset-0 object-contain"
            />
          </div>
        </div>
        <div className="ml-4">
          <p className="text-xl font-semibold">{dataset.name}</p>
          <div className="mt-2">
            <div className="flex items-center">
              <StarIcon color="orange" className="w-6 h-6" />
              <p className="text-gray-600 pl-1">
                {dataset.star.toLocaleString()}
              </p>
              <div className="flex items-center ml-4">
                <EyeIcon className="w-6 h-6" color="gray" />
                <p className="text-gray-600 pl-1">
                  {dataset.watch.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center ml-4">
                <CurrencyDollarIcon className="w-6 h-6" color="gray" />
                <p className="text-gray-600 pl-1">
                  {dataset.isPublic ? 'free' : '260'}
                </p>
              </div>
              <HeartIcon className="w-6 h-6 ml-2 text-red-500" />
            </div>
          </div>
          <div className="mt-1">
            <div className="flex items-center">
              <ChartSquareBarIcon color="orange" className="w-6 h-6" />
              <p className="text-gray-600 pl-1 capitalize">
                {dataset.dataType}/{dataset.task}
              </p>
              <div className="flex items-center ml-4">
                <UserCircleIcon className="w-6 h-6" color="gray" />
                <p className="text-gray-600 pl-1">{dataset.owner}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-700 line-clamp-2">
            {dataset.description}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DatasetItem;
