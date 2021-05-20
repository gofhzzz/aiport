import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import { SearchIcon } from '@heroicons/react/solid';
import {
  PhotographIcon,
  TrashIcon,
  UploadIcon,
} from '@heroicons/react/outline';

// contexts
import { useUI } from '@components/ui/context';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';
import Button from '@components/ui/Button';
import DataDetailsModal from '@components/modals/DataDetailsModal';

// libraries
import getDatasetDataList from '@lib/getDatasetDataList';

// icons
import Spinner from '@components/icons/Spinner';

interface DataInfoWithChecked extends DataInfo {
  checked: boolean;
}

const DatasetDataListPage = () => {
  const [dataList, setDataList] = useState<DataInfoWithChecked[] | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<DataInfoWithChecked | null>(null);
  const [label, setLabel] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
    label: number;
  }>({ x: 72, y: 32, h: 49, w: 32, label: 2490 });
  const [error, setError] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const totalDataList = useRef<DataInfoWithChecked[]>([]);

  const { showNoti } = useUI();

  useDebounce(
    () => {
      setDataList((prev) => {
        if (prev === null) return null;
        if (!searchKey) return totalDataList.current;
        return prev.filter(({ name }) => name.includes(searchKey));
      });
    },
    1000,
    [searchKey],
  );

  useEffect(() => {
    getDatasetDataList()
      .then((dataList) => {
        totalDataList.current = dataList.map((data) => ({
          ...data,
          checked: false,
        }));
        setDataList(
          dataList.map((data) => ({
            ...data,
            checked: false,
          })),
        );
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error !== null) return <div>{error}</div>;

  return (
    <div className="relative mx-auto max-w-screen-xl pt-8 px-4 md:px-6">
      <h1 className="text-3xl font-medium">CIFAR10</h1>

      {/* search and buttons section */}
      <section className="mt-8">
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
                placeholder="Search data..."
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
                dataList === null || !dataList.find(({ checked }) => checked)
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
              onClick={() => {
                showNoti({ variant: 'alert', title: '준비중인 기능입니다.' });
              }}
            >
              <UploadIcon className="w-5 h-5 mr-2" />
              <span>Upload Data</span>
            </Button>
          </div>
        </div>
      </section>

      {/* model list section */}
      <section className="mt-8">
        {dataList === null ? (
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
                              setDataList(
                                dataList.map((data) => ({
                                  ...data,
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
                          Data Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Project
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
                          <span className="sr-only">View</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dataList.map((data, idx) => (
                        <tr key={data._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <input
                              className="rounded-sm"
                              type="checkbox"
                              checked={data.checked}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  const elem = document.getElementById(
                                    'check-all-input',
                                  ) as HTMLInputElement;
                                  elem.checked = false;
                                }
                                setDataList(
                                  dataList.map((prev, idx2) =>
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
                            <PhotographIcon className="w-6 h-6" />
                            <span>{data.name}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-pre-line text-center text-sm text-gray-500">
                            {data.project.join('\n')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {data.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {new Date(data.created).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              className="text-lightBlue-600 hover:text-lightBlue-900"
                              onClick={() => {
                                setIsEdit(true);
                                setSelected(data);
                                setShowModal(true);
                              }}
                            >
                              Edit
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              className="text-lightBlue-600 hover:text-lightBlue-900"
                              onClick={() => {
                                setIsEdit(false);
                                setSelected(data);
                                setShowModal(true);
                              }}
                            >
                              View
                            </button>
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
      {/* details modal */}
      <DataDetailsModal
        isEdit={isEdit}
        onChangeLabel={(val) => setLabel(val)}
        label={label}
        show={showModal}
        setShow={setShowModal}
        data={selected}
      />
    </div>
  );
};

const Sidebar = (
  <div className="py-4 flex flex-col">
    <h2 className="px-4 font-semibold text-xl">CIFAR10</h2>
    <div className="mt-16 space-y-1">
      <Link className="flex px-4 py-2 bg-gray-200" href="/dataset/data">
        <span>Data</span>
      </Link>
      <Link
        className="flex px-4 py-2 hover:bg-gray-50"
        href="/dataset/processing"
      >
        <span>Processing</span>
      </Link>
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Stats</span>
      </Link>
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Settings</span>
      </Link>
    </div>
  </div>
);

DatasetDataListPage.Layout = Dashboard;
DatasetDataListPage.Sidebar = Sidebar;
export default DatasetDataListPage;
