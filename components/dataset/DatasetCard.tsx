import React from 'react';
import cn from 'classnames';

// components
import Link from '@components/ui/Link';

// icon
import { EyeIcon, StarIcon } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';

interface Props {
  className?: string;
  dataset: DatasetInfo;
  idx: number;
}

const DatasetCard = ({ className, dataset, idx }: Props) => {
  return (
    <Link
      href="/dataset/data"
      className={cn(
        className,
        'rounded-md overflow-hidden shadow-md group flex flex-col',
      )}
    >
      <div className="relative aspect-w-16 aspect-h-7 overflow-hidden">
        <img
          className="object-cover transform duration-300 transition-transform group-hover:scale-110"
          src={`/images/dataset/data/${idx + 1}.jpg`}
          loading="lazy"
        />
      </div>
      <div className="px-4 flex-grow">
        <h5 className="mt-2 pb-2 text-center font-semibold border-b-2 border-gray-300">
          {dataset.name}
        </h5>
        <p className="mt-2 text-sm truncate">{dataset.type}</p>
        <div className="mt-1.5 flex space-x-3 text-gray-500 text-sm">
          <div className="flex items-center space-x-1">
            <EyeIcon className="w-5 h-5" />
            <span>{dataset.watch.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <StarIcon className="w-5 h-5" />
            <span>{dataset.star.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 py-1.5 flex justify-between items-center px-4">
        <HeartIcon className="w-5 h-5 text-red-400" />
        <span className="text-sm">Free</span>
      </div>
    </Link>
  );
};

export default DatasetCard;
