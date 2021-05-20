import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';

// components
import Link from '@components/ui/Link';

interface Props {
  className?: string;
  projectId: string;
  projectName: string;
}

const AiSidebar = ({ className, projectId, projectName }: Props) => {
  const router = useRouter();

  return (
    <div className={cn(className, 'py-4 flex flex-col w-60 bg-gray-200')}>
      <h2 className="px-2 font-semibold text-2xl">{projectName}</h2>

      <div className="mt-16 space-y-1">
        <Link
          className={cn('flex p-2 mx-2 bg-gray-200', {
            'bg-gray-300 rounded-md': router.asPath.includes('overview'),
          })}
          href={`/project/overview?projectId=${projectId}`}
        >
          <span>Overview</span>
        </Link>
        <Link
          className={cn('flex p-2 mx-2 bg-gray-200', {
            'bg-gray-300 rounded-md ': router.asPath.includes('experiments'),
          })}
          href={`/project/experiments?projectId=${projectId}&projectName=${projectName}`}
        >
          <span>Experiments</span>
        </Link>
        <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default AiSidebar;
