import React from 'react';
import cn from 'classnames';
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
import { ModelInfo } from 'types/model';

interface Props {
  className?: string;
  model: ModelInfo;
}

const ModelItem = ({ model, className }: Props) => {
  return (
    <div className={className}>
      <Link
        href={`/marketplace/model?id=${model._id}`}
        className="flex hover:bg-gray-200 rounded-md p-2 cursor-pointer"
      >
        <div>
          <div className="relative w-40 pt-[100%]">
            <img
              src={model.src}
              className="absolute w-full h-full inset-0 object-contain"
            />
          </div>
        </div>
        <div className="ml-4">
          <p className="text-xl font-semibold">{model.name}</p>
          <div className="mt-2">
            <div className="flex items-center">
              <StarIcon color="orange" className="w-6 h-6" />
              <p className="text-gray-600 pl-1">
                {model.star.toLocaleString()}
              </p>
              <div className="flex items-center ml-4">
                <EyeIcon className="w-6 h-6" color="gray" />
                <p className="text-gray-600 pl-1">
                  {model.watch.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center ml-4">
                <CurrencyDollarIcon className="w-6 h-6" color="gray" />
                <p className="text-gray-600 pl-1">
                  {model.isPublic ? 'free' : '260'}
                </p>
              </div>
              <HeartIcon className="w-6 h-6 ml-2 text-red-500" />
            </div>
          </div>
          <div className="mt-1">
            <div className="flex capitalize">
              <ChartSquareBarIcon color="orange" className="w-6 h-6" />
              <p className="text-gray-600 pl-1">
                {model.dataType}/{model.task}
              </p>
              <div className="flex items-center ml-4">
                <UserCircleIcon className="w-6 h-6" color="gray" />
                <p className="text-gray-600 pl-1">{model.owner}</p>
              </div>

              <div className="flex items-center">
                <img
                  className={cn('h-6 w-auto', {
                    'mx-2': !model.framework.includes('Pytorch'),
                    'mb-2': model.framework.includes('Pytorch'),
                  })}
                  src={
                    model.framework.includes('Pytorch')
                      ? '/icon/pytorch_logo.png'
                      : '/icon/tf_logo.png'
                  }
                />
                <p className="text-gray-600">{model.framework}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-700 line-clamp-2">
            {model.description}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ModelItem;
