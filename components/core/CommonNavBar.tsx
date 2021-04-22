import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import Link from '@components/ui/Link';
import useUser from '@lib/useUser';
import signin from '@lib/signin';

interface Props {
  className?: string;
}

const CommonNavBar: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const { user } = useUser();

  return (
    <nav className={cn(className, 'bg-white')}>
      <div className="px-8 w-full flex justify-between h-16">
        <Link className="flex-shrink-0 flex items-center" href="/">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
            alt="Workflow"
          />
        </Link>
        <div className="ml-6 flex space-x-8">
          <Link
            href="/contact"
            className={cn(
              'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
              router.asPath === '/contact'
                ? 'border-indigo-500 text-gray-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            )}
          >
            Contact
          </Link>
          <Link
            href="/docs"
            className={cn(
              'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
              router.asPath === '/docs'
                ? 'border-indigo-500 text-gray-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            )}
          >
            Docs
          </Link>
          <button
            className={cn(
              'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              {
                hidden: Boolean(user),
              },
            )}
            onClick={() => signin().then(() => router.push('/dashboard'))}
          >
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
};

export default CommonNavBar;
