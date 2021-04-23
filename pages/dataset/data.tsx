import React, { Fragment, useEffect, useRef, useState } from 'react';
import NextImage from 'next/image';
import { useDebounce } from 'react-use';
import { Dialog, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import {
  PhotographIcon,
  TrashIcon,
  UploadIcon,
  XIcon,
} from '@heroicons/react/outline';

// contexts
import { useUI } from '@components/ui/context';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';
import Button from '@components/ui/Button';

// libraries
import getDatasetDataList from '@lib/getDatasetDataList';

interface DataInfoWithChecked extends DataInfo {
  checked: boolean;
}

const DatasetDataListPage = () => {
  const [dataList, setDataList] = useState<DataInfoWithChecked[] | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<DataInfoWithChecked | null>(null);
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
      <h1 className="text-3xl font-medium">COCO_AUG</h1>

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
          <p className="text-center font-medium mt-12">loading...</p>
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
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          static
          className="absolute z-10 inset-0"
          open={showModal}
          onClose={setShowModal}
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-32 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-white rounded px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
                <button
                  className="absolute top-3 right-3 rounded-full group"
                  onClick={() => setShowModal(false)}
                >
                  <XIcon className="w-6 h-6 group-hover:opacity-70" />
                </button>
                <h5 className="text-lg font-medium">
                  {selected?.name ?? 'loading...'}
                </h5>
                <div className="mt-4 sm:flex">
                  <NextImage
                    className="shadow rounded-md"
                    src={selected?.imageUrl ?? ''}
                    width={500}
                    height={500}
                    objectFit="cover"
                  />
                  <div className="sm:ml-6 min-w-[200px] text-left space-y-5">
                    <div>
                      <h6 className="text-sm text-gray-500">
                        Data Key (Name):
                      </h6>
                      <p>{selected?.name}</p>
                    </div>
                    <div>
                      <h6 className="text-sm text-gray-500">
                        Assigned Project:
                      </h6>
                      <p>{selected?.name}</p>
                    </div>
                    <div>
                      <h6 className="text-sm text-gray-500">Uploaded by:</h6>
                      <p>{selected?.uploader}</p>
                    </div>
                    <div>
                      <h6 className="text-sm text-gray-500">Created Date:</h6>
                      <p>
                        {selected?.created
                          ? new Date(selected.created).toDateString()
                          : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

const Sidebar = (
  <div className="py-4 flex flex-col">
    <h2 className="px-4 font-semibold text-xl">COCO_Aug</h2>
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
