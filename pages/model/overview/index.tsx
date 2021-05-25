import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useDebounce } from 'react-use';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';
import EditModelModal from '@components/modals/EditModelModal';
import Button from '@components/ui/Button';

// libs
import getModel from '@lib/model/getModel';

// utils
import formatDate from '@utils/formatDate';

// icons
import Spinner from '@components/icons/Spinner';
import { SearchIcon } from '@heroicons/react/solid';
import { PlusIcon, TrashIcon } from '@heroicons/react/outline';

// types
import { ModelInfo } from 'types/model';

const initialCodeItems = [
  { name: '__init__.py', model: [], modelList: [], checked: false },
  {
    name: 'fasterrcnn.py',
    model: ['fasterrcnn_mobilenet_v3_large_fpn'],
    modelList: [
      'FasterRCNN',
      'fasterrcnn_resnet50_fpn',
      'fasterrcnn_mobilenet_v3_large_320_fpn',
      'fasterrcnn_mobilenet_v3_large_fpn',
    ],
    checked: false,
  },
  { name: 'mlphead.py', model: [], modelList: ['TwoMLPHead'], checked: false },
  {
    name: 'predictor.py',
    model: [],
    modelList: ['FastRCNNPredictor'],
    checked: false,
  },
];

const ModelOverviewPage = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [codeItems, setCodeItems] = React.useState<
    { name: string; model: string[]; modelList: string[]; checked: boolean }[]
  >(initialCodeItems);
  const [editIndex, setEditIndex] = React.useState<number>(0);
  const [searchKey, setSearchKey] = useState<string>('');
  const [model, setModel] = useState<ModelInfo | null>(null);
  const totalCodes = useRef<
    { name: string; model: string[]; modelList: string[]; checked: boolean }[]
  >([]);

  useEffect(() => {
    getModel('60ab6feb0fb5890a912f41f6')
      .then((model) => setModel(model))
      .catch((err) => console.log(err));

    totalCodes.current = codeItems.map((codeItem) => ({
      ...codeItem,
      checked: false,
    }));
  }, [router, codeItems]);

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

  if (model === null)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto ">
      <h1 className="text-3xl font-semibold">{model.name}</h1>

      <div className="py-4 mt-10 shadow-lg rounded-md mb-8">
        <div className="justify-around flex text-md font-semibold">
          <div className="text-left pl-4 flex-grow">
            <p className="pb-4">Framework: {model.framework}</p>
            <p>Task: {model.task}</p>
          </div>
          <div className="border-r border-gray-300" />
          <div className="flex-grow pl-4">
            <p className="pb-4">Created Time: {formatDate(model.created)}</p>
            <p>Pre-trained Models: {model.pretrained}</p>
          </div>
        </div>
      </div>

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
              disabled={!codeItems.find(({ checked }) => checked)}
            >
              <TrashIcon className="w-5 h-5 mr-2" />
              <span>Delete</span>
            </Button>
            <NextLink href="/model/upload">
              <Button size="sm">
                <PlusIcon className="w-5 h-5 mr-2" />
                <span>Upload Module</span>
              </Button>
            </NextLink>
          </div>
        </div>
      </section>
      <section className="flex flex-col mt-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <p className="text-sm text-lightBlue-400 ml-2 mb-2">
              Please select classes or function that returns a model class
            </p>
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
                      <td className="px-6 py-4  whitespace-nowrap text-center font-medium text-gray-500 space-x-4">
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

                      <td>
                        {code.modelList.length !== 0 ? (
                          <button
                            className="text-lightBlue-400 text-center hover:opacity-80 hover:underline"
                            onClick={() => {
                              setEditIndex(idx);
                              setOpenModal(true);
                            }}
                          >
                            <p>Edit</p>
                          </button>
                        ) : (
                          <p className="ml-2 text-gray-600">-</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <EditModelModal
        show={openModal}
        setShow={setOpenModal}
        data={codeItems[editIndex]}
        modelItems={codeItems[editIndex].modelList}
        setChange={setCodeItems}
      />
    </div>
  );
};

const Sidebar = (
  <div className="py-4 flex flex-col">
    <h2 className="px-4 font-semibold text-xl">Faster R-CNN</h2>
    <div className="mt-16 space-y-1">
      <Link className="flex px-4 py-2 bg-gray-200" href="/model/overview">
        <span>Overview</span>
      </Link>
      <Link
        className="flex px-4 py-2 hover:bg-gray-50"
        href="https://211.184.186.91:8888/lab"
        target="blank"
      >
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

ModelOverviewPage.Layout = Dashboard;
ModelOverviewPage.Sidebar = Sidebar;
export default ModelOverviewPage;
