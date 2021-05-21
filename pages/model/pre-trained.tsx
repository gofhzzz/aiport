import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDebounce } from 'react-use';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';
import Button from '@components/ui/Button';
import { useUI } from '@components/ui/context';

// icons
import { SearchIcon } from '@heroicons/react/solid';
import { PlusIcon } from '@heroicons/react/outline';

const initialCodeItems = [
  {
    name: 'epoch30_val91.pt',
    model: ['fasterrcnn_mobilenet_v3_large_fpn'],
    storage: '0.9GB',
    created: '2021-04-28',
    checked: false,
  },
];

const ModelJupyterPage = () => {
  const router = useRouter();
  const [codeItems, setCodeItems] = React.useState<
    {
      name: string;
      model: string[];
      storage: string;
      created: string;
      checked: boolean;
    }[]
  >(initialCodeItems);
  const [searchKey, setSearchKey] = useState<string>('');
  const totalCodes = useRef<
    {
      name: string;
      model: string[];
      storage: string;
      created: string;
      checked: boolean;
    }[]
  >([]);

  const { showNoti } = useUI();

  useEffect(() => {
    totalCodes.current = codeItems.map((codeItem) => ({
      ...codeItem,
      checked: false,
    }));
  }, [router]);

  useDebounce(
    () => {
      setCodeItems((prev) => {
        if (!searchKey) return totalCodes.current;
        return prev.filter(({ name }) => name.includes(searchKey));
      });
    },
    1000,
    [searchKey],
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">Pre-Trained</h1>

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
                placeholder="Search Pre-trained model..."
                type="search"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
          </div>
          {/* button groups */}
          <div className="flex items-center flex-shrink-0 space-x-4">
            <Button
              onClick={() => showNoti({ title: '준비중인 기능입니다.' })}
              size="sm"
              color="red"
            >
              <span>Delete</span>
            </Button>
            <Button
              color="white"
              size="sm"
              onClick={() => showNoti({ title: '준비중인 기능입니다.' })}
            >
              <span>Download</span>
            </Button>
            <Button
              size="sm"
              onClick={() => showNoti({ title: '준비중인 기능입니다.' })}
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              <span>Upload File</span>
            </Button>
          </div>
        </div>
      </section>
      <section className="flex flex-col mt-4">
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
                          setCodeItems(
                            codeItems.map((code) => ({
                              ...code,
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Model
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Storage
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Upload Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {codeItems.map((code, idx) => (
                    <tr key={`${code.name}-${idx}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <input
                          className="rounded-sm"
                          type="checkbox"
                          checked={code.checked}
                          onChange={(e) => {
                            if (!e.target.checked) {
                              const elem = document.getElementById(
                                'check-all-input',
                              ) as HTMLInputElement;
                              elem.checked = false;
                            }
                            setCodeItems(
                              codeItems.map((prev, idx2) =>
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
                      <td className="px-6 py-4 h-full whitespace-nowrap text-sm text-gray-500 text-center">
                        <span>{code.name}</span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        {code.model.length === 0 ? (
                          <div className="text-lightBlue-600">-</div>
                        ) : (
                          code.model.map((val, idx) => (
                            <div
                              className="text-lightBlue-600"
                              key={`${val}-${idx}`}
                            >
                              {val}
                            </div>
                          ))
                        )}
                      </td>

                      <td className="px-6 py-4 h-full whitespace-nowrap text-sm text-gray-500 text-center">
                        <span>{code.storage}</span>
                      </td>

                      <td className="px-6 py-4 h-full whitespace-nowrap text-sm text-gray-500 text-center">
                        <span>{code.created}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Sidebar = (
  <div className="py-4 flex flex-col">
    <h2 className="px-4 font-semibold text-xl">Faster R-CNN</h2>
    <div className="mt-16 space-y-1">
      <Link className="flex px-4 py-2 bg-gray-200" href="/model/jupyter">
        <span>Overview</span>
      </Link>
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Jupyter lab</span>
      </Link>
      <Link
        className="flex px-4 py-2 hover:bg-gray-50"
        href="/model/pre-trained"
      >
        <span>Pre-trained</span>
      </Link>
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Stats</span>
      </Link>
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Visual</span>
      </Link>
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Setting</span>
      </Link>
    </div>
  </div>
);

ModelJupyterPage.Layout = Dashboard;
ModelJupyterPage.Sidebar = Sidebar;
export default ModelJupyterPage;
