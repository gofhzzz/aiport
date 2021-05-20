import React from 'react';
import cn from 'classnames';
import NextImage from 'next/image';

// icon
import { EyeIcon, StarIcon } from '@heroicons/react/solid';

interface Props {
  className?: string;
  dataset: DatasetInfo;
  idx: number;
}

const DatasetCard = ({ className, dataset, idx }: Props) => {
  return (
    <div className={cn(className, 'shadow-md border-2 w-full p-2')}>
      <NextImage
        objectFit="cover"
        width={300}
        height={150}
        src={`/images/dataset/data/${idx + 1}.jpg`}
      />
      <div className="mb-4">
        <p className=" border-b-2 border-gray-300 mx-2 text-xl font-semibold text-center">
          {dataset.name}
        </p>
        <div className="m-2">
          <p>Type: {dataset.type}</p>
          <div className="flex mt-1">
            <div className="flex items-center gap-2">
              <EyeIcon className="w-4 h-4" color="gray" />
              <p>{dataset.watch}</p>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <StarIcon className="w-4 h-4" color="orange" />
              <p>{dataset.star}</p>
            </div>
          </div>
          <p>Price: {dataset.isPublic ? 'Free' : '123.45$'}</p>
        </div>
      </div>
    </div>
  );
};

export default DatasetCard;
