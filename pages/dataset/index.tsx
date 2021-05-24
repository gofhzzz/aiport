import React, { useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { useDebounce } from 'react-use';
import { SearchIcon } from '@heroicons/react/solid';
import {
  // DatabaseIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  DownloadIcon,
  PhotographIcon,
  PlusIcon,
} from '@heroicons/react/outline';

// contexts
import { useUI } from '@components/ui/context';

// components
import Dashboard from '@components/layout/Dashboard';
import SectionTitle from '@components/core/SectionTitle';
import Button from '@components/ui/Button';
import Link from '@components/ui/Link';

// libraries
import getDatasets from '@lib/dataset/getDatasets';

// utilities
import formatDate from '@utils/formatDate';

// icons
import { DatabaseIcon } from '@components/icons';
import MedalIcon from '@components/icons/MedalIcon';
import Spinner from '@components/icons/Spinner';

// types
import { DatasetInfo } from 'types/dataset';

interface DatasetInfoWithChecked extends DatasetInfo {
  checked: boolean;
}

const DatasetListPage = () => {
  const [datasets, setDatasets] = useState<DatasetInfoWithChecked[] | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const totalDatasets = useRef<DatasetInfoWithChecked[]>([]);

  const { showNoti } = useUI();

  useDebounce(
    () => {
      setDatasets((prev) => {
        if (prev === null) return null;
        if (!searchKey) return totalDatasets.current;
        return prev.filter(({ name }) => name.includes(searchKey));
      });
    },
    1000,
    [searchKey],
  );

  useEffect(() => {
    getDatasets()
      .then((datasets) => {
        totalDatasets.current = datasets.map((dataset) => ({
          ...dataset,
          checked: false,
        }));
        setDatasets(
          datasets.map((dataset) => ({
            ...dataset,
            checked: false,
          })),
        );
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error !== null) return <div>{error}</div>;

  return (
    <div className="mx-auto max-w-screen-xl pt-8 md:pt-16 px-4 md:px-6">
      <SectionTitle picture="/icon/dataset.png" title="Dataset" />

      {/* search and buttons section */}
      <section className="mt-8 md:mt-12">
        <div className="space-y-4 flex flex-col items-end md:flex-row md:space-y-0 md:space-x-4 md:justify-between">
          {/* search input */}
          <div className="self-stretch flex-grow md:max-w-lg">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search datasets..."
                type="search"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
          </div>
          {/* button groups */}
          <div className="flex items-center flex-shrink-0 space-x-4">
            <Button
              size="sm"
              color="white"
              disabled={
                datasets === null || !datasets.find(({ checked }) => checked)
              }
              onClick={() => {
                showNoti({ variant: 'alert', title: '준비중인 기능입니다.' });
              }}
            >
              <DownloadIcon className="w-5 h-5 mr-2" />
              <span>Download</span>
            </Button>
            <Button
              size="sm"
              color="white"
              disabled={
                datasets === null || !datasets.find(({ checked }) => checked)
              }
              onClick={() => {
                showNoti({ variant: 'alert', title: '준비중인 기능입니다.' });
              }}
            >
              <DocumentDuplicateIcon className="w-5 h-5 mr-2" />
              <span>Duplicate</span>
            </Button>
            <NextLink href="/dataset/upload">
              <Button size="sm">
                <PlusIcon className="w-5 h-5 mr-2" />
                <span>New Dataset</span>
              </Button>
            </NextLink>
          </div>
        </div>
      </section>

      {/* model list section */}
      <section className="mt-8 md:mt-16">
        {datasets === null ? (
          <div className="h-[404px] flex justify-center items-center">
            <Spinner className="w-12 h-12 animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <input
                            id="check-all-input"
                            className="rounded-sm"
                            type="checkbox"
                            onChange={(e) => {
                              setDatasets(
                                datasets.map((dataset) => ({
                                  ...dataset,
                                  checked: e.target.checked,
                                })),
                              );
                            }}
                          />
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Dataset Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Size
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Created Date
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Open</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {datasets.map((dataset, idx) => (
                        <tr key={dataset._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <input
                              className="rounded-sm"
                              type="checkbox"
                              checked={dataset.checked}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  const elem = document.getElementById(
                                    'check-all-input',
                                  ) as HTMLInputElement;
                                  elem.checked = false;
                                }
                                setDatasets(
                                  datasets.map((prev, idx2) =>
                                    idx !== idx2
                                      ? prev
                                      : {
                                          ...prev,
                                          checked: e.target.checked,
                                        },
                                  ),
                                );
                              }}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-4">
                            <DatabaseIcon className="w-6 h-6" />
                            <span>{dataset.name}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {dataset.dataType.split('/')[0] === 'image' ? (
                              <div className="flex justify-center items-center space-x-2 transform -translate-x-4">
                                <PhotographIcon className="w-6 h-6" />
                                <span>Image</span>
                              </div>
                            ) : (
                              <div className="flex justify-center items-center space-x-2 transform -translate-x-1">
                                <DocumentTextIcon className="w-6 h-6" />
                                <span>Language</span>
                              </div>
                            )}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            1.3GB items
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {formatDate(String(dataset.created))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href="/dataset/data"
                              className="text-lightBlue-600 hover:text-lightBlue-900"
                            >
                              Open
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

DatasetListPage.Layout = Dashboard;
export default DatasetListPage;
