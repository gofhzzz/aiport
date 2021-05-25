import React, { useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { useDebounce } from 'react-use';
import { SearchIcon } from '@heroicons/react/solid';
import {
  // CubeTransparentIcon,
  DocumentDuplicateIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/outline';

// contexts
import { useUI } from '@components/ui/context';

// components
import Dashboard from '@components/layout/Dashboard';
import SectionTitle from '@components/core/SectionTitle';
import Button from '@components/ui/Button';
import Link from '@components/ui/Link';

// libraries
import getModels from '@lib/model/getModels';

// utilities
import formatDate from '@utils/formatDate';

// icons
import { AIIcon } from '@components/icons';
import LockIcon from '@components/icons/LockIcon';
import Spinner from '@components/icons/Spinner';

// types
import { ModelInfo } from 'types/model';

interface ModelInfoWithChecked extends ModelInfo {
  checked: boolean;
}

const ModelListPage = () => {
  const [models, setModels] = useState<ModelInfoWithChecked[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const totalModels = useRef<ModelInfoWithChecked[]>([]);

  const { showNoti } = useUI();

  useDebounce(
    () => {
      setModels((prev) => {
        if (prev === null) return null;
        if (!searchKey) return totalModels.current;
        return prev.filter(({ name }) => name.includes(searchKey));
      });
    },
    1000,
    [searchKey],
  );

  useEffect(() => {
    getModels()
      .then((models) => {
        totalModels.current = models.map((model) => ({
          ...model,
          checked: false,
        }));
        setModels(
          models.map((model) => ({
            ...model,
            checked: false,
          })),
        );
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error !== null) return <div>{error}</div>;

  return (
    <div className="mx-auto max-w-screen-xl pt-8 md:pt-16 px-4 md:px-6">
      <SectionTitle picture="/icon/model.png" title="Model" />

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
                placeholder="Search models..."
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
              color="red"
              disabled={
                models === null || !models.find(({ checked }) => checked)
              }
              onClick={() => {
                showNoti({ variant: 'alert', title: '준비중인 기능입니다.' });
              }}
            >
              <TrashIcon className="w-5 h-5 mr-2" />
              <span>Delete</span>
            </Button>
            <Button
              size="sm"
              color="white"
              disabled={
                models === null || !models.find(({ checked }) => checked)
              }
              onClick={() => {
                showNoti({ variant: 'alert', title: '준비중인 기능입니다.' });
              }}
            >
              <DocumentDuplicateIcon className="w-5 h-5 mr-2" />
              <span>Duplicate</span>
            </Button>
            <NextLink href="/model/upload">
              <Button size="sm">
                <PlusIcon className="w-5 h-5 mr-2" />
                <span>New Model</span>
              </Button>
            </NextLink>
          </div>
        </div>
      </section>

      {/* model list section */}
      <section className="mt-8 md:mt-16">
        {models === null ? (
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
                              setModels(
                                models.map((model) => ({
                                  ...model,
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
                          Model Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Framework
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
                          Created Date
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {models.map((model, idx) => (
                        <tr key={model._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <input
                              className="rounded-sm"
                              type="checkbox"
                              checked={model.checked}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  const elem = document.getElementById(
                                    'check-all-input',
                                  ) as HTMLInputElement;
                                  elem.checked = false;
                                }
                                setModels(
                                  models.map((prev, idx2) =>
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
                            <AIIcon className="w-6 h-6" />
                            <span>{model.name}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {model.framework.includes('Pytorch') ? (
                              <div className="flex justify-center items-center space-x-2 transform -translate-x-6">
                                <img
                                  className="h-6 w-auto"
                                  src="/icon/pytorch_logo.png"
                                />
                                <span>{model.framework}</span>
                              </div>
                            ) : (
                              <div className="flex justify-center items-center space-x-2 transform -translate-x-4">
                                <img
                                  className="h-6 w-auto mr-1"
                                  src="/icon/tf_logo.png"
                                />
                                <span>{model.framework}</span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {!model.isPublic ? (
                              <div className="flex justify-center items-center space-x-2 transform -translate-x-4">
                                <LockIcon className="w-6 h-6" />
                                <span>Private</span>
                              </div>
                            ) : (
                              'Public'
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {formatDate(model.created)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={`/model/overview?modelId=${model._id}`}
                              className="text-lightBlue-600 hover:text-lightBlue-900"
                            >
                              Edit
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

ModelListPage.Layout = Dashboard;
export default ModelListPage;
