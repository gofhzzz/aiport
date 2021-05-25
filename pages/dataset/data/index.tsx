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

// utils
import formatDate from '@utils/formatDate';

// libraries
import getDatasetDataList from '@lib/dataset/getDatasetDataList';
import getDataset from '@lib/dataset/getDataset';

// icons
import Spinner from '@components/icons/Spinner';

// types
import { DatasetDataInfo } from 'types/data';
import { DatasetInfo } from 'types/dataset';

export interface DataInfoWithChecked extends DatasetDataInfo {
  checked: boolean;
}

const DatasetDataListPage = () => {
  const [dataList, setDataList] = useState<DataInfoWithChecked[] | null>(null);
  const [dataset, setDataset] = useState<DatasetInfo | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const [editFalg, setEditFalg] = useState<boolean>(false);
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
    getDataset('60ab75a30fb5890a912f41fe').then((dataset) =>
      setDataset(dataset),
    );

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

  if (dataList === null || dataset === null)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );

  return (
    <div className="relative mx-auto max-w-screen-xl pt-8 px-4 md:px-6">
      <h1 className="text-3xl font-medium">{dataset.name}</h1>

      {/* search and buttons section */}
      <section className="mt-8">
        <div className="py-4 mt-10 max-w-7xl mx-auto shadow-lg rounded-md mb-8">
          <div className="justify-around flex text-md font-semibold">
            <div className="text-left pl-4 flex-grow">
              <p className="pb-4">Data type: {dataset.dataType}</p>
              <p>Task: {dataset.task}</p>
            </div>
            <div className="border-r border-gray-300" />
            <div className="flex-grow pl-4">
              <p className="pb-4">
                Created Time: {formatDate(dataset.created)}
              </p>
            </div>
          </div>
        </div>
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
              disabled={
                dataList === null || !dataList.find(({ checked }) => checked)
              }
              onClick={() => {
                setEditFalg((prev) => !prev);
              }}
            >
              <span>{editFalg ? 'Save' : 'Edit'}</span>
            </Button>
            <Button
              size="sm"
              color="red"
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
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        AI
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
                        Label
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
                        <td className="px-6 justify-center pb-4 pt-8 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-4">
                          <PhotographIcon className="w-6 h-6" />
                          <span>{`0000${idx + 1}.jpg`}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-pre-line text-center text-sm text-gray-500">
                          {'-'}
                        </td>
                        <td className="px-6 py-4 capitalize whitespace-nowrap text-center text-sm text-gray-500">
                          {data.split}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                          {editFalg ? (
                            <>
                              <div className="flex justify-center mb-1">
                                <p className="flex mr-2">
                                  X:
                                  <input
                                    value={String(data.x_1)}
                                    className="w-12 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                                    onChange={(e) => {
                                      setDataList(
                                        (prev) =>
                                          prev &&
                                          prev.map((item, index) => {
                                            if (index === idx)
                                              return {
                                                ...item,
                                                x_1: Number(e.target.value),
                                              };
                                            return item;
                                          }),
                                      );
                                    }}
                                  />
                                </p>
                                <p className="flex">
                                  Y:
                                  <input
                                    value={String(data.y_1)}
                                    className="w-12 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                                    onChange={(e) => {
                                      setDataList(
                                        (prev) =>
                                          prev &&
                                          prev.map((item, index) => {
                                            if (index === idx)
                                              return {
                                                ...item,
                                                y_1: Number(e.target.value),
                                              };
                                            return item;
                                          }),
                                      );
                                    }}
                                  />
                                </p>
                              </div>
                              <div className="flex justify-center mb-1">
                                <p className="flex mr-2">
                                  W:
                                  <input
                                    value={String(data.width)}
                                    className="w-12 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                                    onChange={(e) => {
                                      setDataList(
                                        (prev) =>
                                          prev &&
                                          prev.map((item, index) => {
                                            if (index === idx)
                                              return {
                                                ...item,
                                                width: Number(e.target.value),
                                              };
                                            return item;
                                          }),
                                      );
                                    }}
                                  />
                                </p>
                                <p className="w-20 flex">
                                  H:
                                  <input
                                    value={String(data.height)}
                                    className="w-12 ml-1 px-1 border-2 border-lightBlue-400 rounded-md"
                                    onChange={(e) => {
                                      setDataList(
                                        (prev) =>
                                          prev &&
                                          prev.map((item, index) => {
                                            if (index === idx)
                                              return {
                                                ...item,
                                                height: Number(e.target.value),
                                              };
                                            return item;
                                          }),
                                      );
                                    }}
                                  />
                                </p>
                              </div>
                              <p className="flex justify-center">
                                Label:
                                <input
                                  value={String(data.label)}
                                  className="w-20 flex justify-center px-1 border-2 border-lightBlue-400 rounded-md"
                                  onChange={(e) => {
                                    setDataList(
                                      (prev) =>
                                        prev &&
                                        prev.map((item, index) => {
                                          if (index === idx)
                                            return {
                                              ...item,
                                              label: Number(e.target.value),
                                            };
                                          return item;
                                        }),
                                    );
                                  }}
                                />
                              </p>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-center">
                                <p className="mr-2">x: {data.x_1}</p>
                                <p>y: {data.y_1}</p>
                              </div>
                              <div className="flex justify-center">
                                <p className="mr-2">w: {data.width}</p>
                                <p>h: {data.height}</p>
                              </div>
                              <p>label: {data.label}</p>
                            </>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                          {formatDate(String(new Date()))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-lightBlue-600 hover:text-lightBlue-900"
                            onClick={() => {
                              setShowModal(true);
                              setSelectedIndex(idx);
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
      </section>
      {/* details modal */}

      <DataDetailsModal
        show={showModal}
        setCangeData={setDataList}
        setShow={setShowModal}
        data={dataList}
        selectedIndex={selectedIndex}
      />
    </div>
  );
};

const Sidebar = (
  <div className="py-4 flex flex-col">
    <h2 className="px-4 font-semibold text-xl">CelebA</h2>
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
