import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import Link from '@components/ui/Link';
import useUser from '@lib/useUser';

interface Props {
  className?: string;
}

const CommonNavBar: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const { user } = useUser();

  return (
    <nav className={cn(className, 'bg-white')}>
      <div className="px-8 w-full flex justify-between h-16">
        <Link className="flex-shrink-0 flex items-center space-x-2" href="/">
          <img className="h-8 w-auto" src="/logo.png" alt="" />
          <span className="text-3xl font-serif font-medium">Aiport</span>
        </Link>
        <div className="ml-6 flex space-x-8">
          <Link
            href="/contact"
            className={cn(
              'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
              router.asPath === '/contact'
                ? 'border-lightBlue-500 text-gray-900'
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
                ? 'border-lightBlue-500 text-gray-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            )}
          >
            Docs
          </Link>
          <Link
            href="/signin"
            className={cn(
              'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              { hidden: Boolean(user) },
            )}
          >
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default CommonNavBar;
