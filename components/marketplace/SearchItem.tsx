import React from 'react';
import cn from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/solid';

// components
import Button from '@components/ui/Button';
import Dropdown from '@components/ui/Dropdown';
import Input from '@components/ui/Input';
import Link from '@components/ui/Link';

interface Props {
  className?: string;
  initialDropdownItem?: 'ai' | 'dataset' | 'model';
}

const SearchItem = ({ className, initialDropdownItem = 'ai' }: Props) => {
  const [searchCategory, setSearchCategory] = React.useState<
    'ai' | 'dataset' | 'model'
  >(initialDropdownItem);
  const [searchInput, setSearchInput] = React.useState<string>('');
  const DropdownItems = [
    { label: 'Ai', onClick: () => setSearchCategory('ai') },
    { label: 'Dataset', onClick: () => setSearchCategory('dataset') },
    { label: 'Model', onClick: () => setSearchCategory('model') },
  ];

  return (
    <div className={cn(className, 'w-full justify-center flex items-center')}>
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
      <Link
        href={`/marketplace?category=${searchCategory}&searchInput=${searchInput}`}
      >
        <Button className="mt-1 ml-2">Search</Button>
      </Link>
    </div>
  );
};

export default SearchItem;
