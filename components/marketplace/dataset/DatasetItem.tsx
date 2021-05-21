import React from 'react';
import { EyeIcon, MenuIcon, StarIcon } from '@heroicons/react/solid';
import {
  ChartSquareBarIcon,
  CurrencyDollarIcon,
  HeartIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';

// components
import Link from '@components/ui/Link';

interface Props {
  className?: string;
  dataset: DatasetInfo;
  src: string;
}

const DatasetItem = ({ dataset, className, src }: Props) => {
  return (
    <div className={className}>
      <Link
        href={`/marketplace/dataset?id=${dataset._id}`}
        className="flex hover:bg-gray-200 rounded-md p-2 cursor-pointer"
      >
        <img src={src} className="rounded-md object-cover w-40 h-40" />
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
                  {dataset.star.toLocaleString()}
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
              <p className="text-gray-600 pl-1">{dataset.type}</p>
              <div className="flex items-center ml-4">
                <UserCircleIcon className="w-6 h-6" color="gray" />
                <p className="text-gray-600 pl-1">{dataset.owner}</p>
              </div>
              <div className="flex items-center ml-4">
                <MenuIcon className="w-6 h-6" color="gray" />
                <p className="text-gray-600 pl-1">{'Dataset'}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-700 line-clamp-2">
            대충 설명 넣기대충 설명 넣기대충 설명 넣기대충 설명 넣기대충 설명
            넣기대충 설명 넣기대충 설명 넣기대충 설명 넣기대충 설명 넣기대충
            설명 넣기대충 설명 넣기대충 설명 넣기대충 설명 넣기대충 설명
            넣기대충 설명 넣기
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DatasetItem;
