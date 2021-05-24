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
import { SampleProjectInfo } from 'types/project';

interface Props {
  className?: string;
  project: SampleProjectInfo;
}

const ProjectItem = ({ project, className }: Props) => {
  return (
    <div className={className}>
      <Link
        className="flex hover:bg-gray-200 rounded-md p-2 cursor-pointer"
        href={`/marketplace/ai?id=${project._id}`}
      >
        <div className="flex justify-center relative w-40 h-40">
          <img
            src={project.src}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
        <div className="ml-4">
          <p className="text-xl font-semibold">{project.name}</p>
          <div className="mt-2">
            <div className="flex items-center">
              <StarIcon color="orange" className="w-6 h-6" />
              <p className="text-gray-600 pl-1">
                {project.star.toLocaleString()}
              </p>
              <div className="flex items-center ml-4">
                <EyeIcon className="w-6 h-6" color="gray" />
                <p className="text-gray-600 pl-1">
                  {project.star.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center ml-4">
                <CurrencyDollarIcon className="w-6 h-6" color="gray" />
                <p className="text-gray-600 pl-1">
                  {project.isPublic ? 'free' : project.price.toLocaleString()}
                </p>
              </div>
              <HeartIcon className="w-6 h-6 ml-2 text-red-500" />
            </div>
          </div>
          <div className="mt-1">
            <div className="flex items-center">
              <ChartSquareBarIcon color="orange" className="w-6 h-6" />
              <p className="text-gray-600 pl-1 capitalize">
                {project.dataType}/{project.task}
              </p>
              <div className="flex items-center ml-4">
                <UserCircleIcon className="w-6 h-6" color="gray" />
                <p className="text-gray-600 pl-1">{project.owner}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-700 line-clamp-2">
            {project.description}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectItem;
