import React, { useState } from 'react';

import cn from 'classnames';
// components
import Dashboard from '@components/layout/Dashboard';
import Button from '@components/ui/Button';
import Link from '@components/ui/Link';
import ExperimentDownloadModal from '@components/modals/ExperimentDownloadModal';

// icons
import Spinner from '@components/icons/Spinner';
import { ArrowRightIcon } from '@heroicons/react/solid';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
} from '@heroicons/react/outline';

const outputItems: { name: string; idx: number; per: number }[] = [
  { name: 'Lee Jun Ho', idx: 1, per: 94.4 },
  { name: 'Ken Jeong', idx: 2, per: 4.8 },
  { name: 'Kim bum', idx: 3, per: 0.48 },
];

const secondOutputItems: { name: string; idx: number; per: number }[] = [
  { name: 'Jo In Sung', idx: 1, per: 54 },
  { name: 'Cha Seung Won', idx: 2, per: 23.3 },
  { name: 'Lee Jin Wook', idx: 3, per: 19.7 },
];

const pages = [
  { name: 'Exp_1', href: '/project/experiments', current: false },
  { name: 'Deploy', href: '#', current: true },
];

const ProjectExperimentsDetailsPage = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragOverFlag, setDragOverFlag] = React.useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [imageFlag, setImageFlag] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const [previewName, setPreviewName] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [history, setHistory] = React.useState<
    { name: string; idx: number; per: number }[][]
  >([]);
  const [historyInfo, setHistoryInfo] = React.useState<
    { name: string; src: string }[]
  >([]);

  const [outputInfo, setOutputInfo] = React.useState<{
    name: string;
    idx: number;
    per: number;
  } | null>(null);

  const handleImage = React.useCallback(
    async (file: File) => {
      setPreviewName(file.name);
      await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(String(reader.result));
          resolve('');
        };

        reader.readAsDataURL(file);
      });
      setLoading(true);

      if (imageFlag === 1) {
        setTimeout(() => {
          setLoading(false);
          setOutputInfo(outputItems[0]);
          setImageFlag(0);
          setHistory((prev) => [outputItems, ...prev]);
        }, 3000);
        setHistoryInfo((prev) => [
          { name: 'IMG_0002', src: '/images/deploy/upload/2.JPG' },
          ...prev,
        ]);
      } else {
        setTimeout(() => {
          setLoading(false);
          setOutputInfo(secondOutputItems[0]);
          setImageFlag(1);
          setHistory((prev) => [secondOutputItems, ...prev]);
          setHistoryInfo((prev) => [
            { name: 'choinsung', src: '/images/deploy/upload/1.png' },
            ...prev,
          ]);
        }, 3000);
      }
    },
    [imageFlag],
  );

  return (
    <>
      <div className="mx-auto max-w-screen-xl pt-8 px-4 md:px-6 pb-16">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <a href="/" className="text-gray-400 hover:text-gray-500">
                  <HomeIcon
                    className="flex-shrink-0 h-5 w-5"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Home</span>
                </a>
              </div>
            </li>
            {pages.map((page) => (
              <li key={page.name}>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <a
                    href={page.href}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    aria-current={page.current ? 'page' : undefined}
                  >
                    {page.name}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </nav>

        <div className="relative mt-4">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
        </div>
        <div className="pt-12 flex justify-center items-center">
          <div className="flex justify-around w-full">
            <div>
              <p className="text-gray-700 text-center text-2xl font-semibold">
                Input
              </p>
              <div className="w-96 mt-4 p-2 rounded-md border-gray-400 h-96 border-2">
                <div className="flex justify-between items-center">
                  <p className="border border-gray-400 rounded-md w-full h-[40px] mr-1 flex items-center pl-2 text-gray-700">
                    {previewName || 'Input Image'}
                  </p>
                  <Button size="sm" onClick={() => inputRef?.current?.click()}>
                    Select
                  </Button>
                </div>
                <div
                  className={cn(
                    'border-2 w-90 border-gray-300 h-80 mt-2 border-dashed flex items-center justify-center overflow-hidden',
                    {
                      'bg-primary text-white': dragOverFlag,
                    },
                  )}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
                    setDragOverFlag(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
                    setDragOverFlag(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragOverFlag(false);
                    if (!e.dataTransfer) return;

                    handleImage(e.dataTransfer.files[0]);
                  }}
                >
                  <p className="text-lg">
                    {previewUrl ? (
                      <img src={previewUrl} className="w-72 h-72" />
                    ) : (
                      'Drag&Drop Image Here'
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <ArrowRightIcon
                className={cn('w-20 h-20', {
                  'animate-pulse': loading,
                })}
              />
            </div>
            <div>
              <p className="text-gray-700 text-center text-2xl font-semibold">
                Output
              </p>
              <div className="w-96 mt-4 p-2 rounded-md border-gray-400 h-96 border-2 relative">
                {loading ? (
                  <div className="h-[360px] flex justify-center items-center">
                    <Spinner className="w-12 h-12 animate-spin" />
                  </div>
                ) : (
                  <div>
                    {outputInfo === null ? (
                      <p className="flex justify-center items-center h-80 text-2xl font-semibold">
                        No Data
                      </p>
                    ) : (
                      <>
                        <button
                          className="disabled:text-gray-400 disabled:cursor-default"
                          disabled={outputInfo.idx === 1}
                          onClick={() => {
                            if (imageFlag === 1)
                              setOutputInfo(
                                (prev) =>
                                  prev && secondOutputItems[prev.idx - 2],
                              );
                            else {
                              setOutputInfo(
                                (prev) => prev && outputItems[prev.idx - 2],
                              );
                            }
                          }}
                        >
                          <ChevronLeftIcon
                            className={cn(
                              'w-12 h-12 absolute left-0 top-36 z-10',
                            )}
                          />
                        </button>
                        <button
                          className="disabled:text-gray-400 disabled:cursor-default"
                          disabled={outputInfo.idx === 3}
                          onClick={() => {
                            if (imageFlag === 1)
                              setOutputInfo(
                                (prev) => prev && secondOutputItems[prev.idx],
                              );
                            else {
                              setOutputInfo(
                                (prev) => prev && outputItems[prev.idx],
                              );
                            }
                          }}
                        >
                          <ChevronRightIcon
                            className={cn(
                              'w-12 h-12 absolute right-0 top-36 z-10',
                            )}
                          />
                        </button>
                        <p className="text-lg text-center mb-2 -mt-4 font-semibold">{`${outputInfo.idx}.${outputInfo.name}`}</p>
                        <div className="flex items-center justify-center relative">
                          <img
                            src={`/images/deploy/${
                              imageFlag ? outputInfo.idx : outputInfo.idx + 3
                            }.png`}
                            className="object-cover w-72 h-72"
                          />
                        </div>
                        <p className="text-lg text-center font-semibold">
                          {outputInfo.per}%
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="my-8 w-full border-t border-gray-300" />
        <div>
          <h2 className="text-2xl font-bold">History</h2>
          <div className="min-h-[150px] my-2 p-2 rounded-md border border-gray-400">
            {loading ? (
              <div className="pt-8 flex justify-center items-center">
                <Spinner className="w-12 h-12 animate-spin" />
              </div>
            ) : outputInfo === null ? (
              <p className="text-lg mt-12 h-full flex justify-center items-center font-bold">
                No Data
              </p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300 pb-4">
                    <th className="text-md font-semiboldd">preview</th>
                    <th className="text-md font-semiboldd">Input name</th>
                    <th className="text-md font-semiboldd">prediction-1</th>
                    <th className="text-md font-semiboldd">prediction-2</th>
                    <th className="text-md font-semiboldd">prediction-3</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((val, idx) => {
                    return (
                      <tr key={`array-${idx}`}>
                        <th className="pt-4 flex justify-center items-center">
                          <img
                            src={historyInfo[idx]?.src}
                            className="object-cover w-20 h-20"
                          />
                        </th>
                        <th>
                          <p>{historyInfo[idx]?.name}</p>
                        </th>
                        {val.map((item, index) => {
                          return (
                            <th key={`value-${index}`}>
                              <p>
                                <span className="mr-2 text-lightBlue-400">
                                  {item.name}
                                </span>
                                {item.per}%
                              </p>
                            </th>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <ExperimentDownloadModal show={show} setShow={setShow} />
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        accept="image/x-png,image/gif,image/jpeg, image/png"
        onChange={(e) => {
          if (e.target.files && e.target.files.length !== 0)
            handleImage(e.target.files[0]);
        }}
      />
    </>
  );
};

const Sidebar = (
  <div className="py-4 flex flex-col">
    <h2 className="px-4 font-semibold text-xl">
      Celebrity Look-alike Recommender
    </h2>
    <div className="mt-16 space-y-1">
      <Link
        className="flex px-4 py-2 hover:bg-gray-50"
        href="/project/overview"
      >
        <span>Overview</span>
      </Link>
      <Link className="flex px-4 py-2 bg-gray-200" href="/project/experiments">
        <span>Experiments</span>
      </Link>
      <Link className="flex px-4 py-2 " href="#">
        <span>Settings</span>
      </Link>
    </div>
  </div>
);

ProjectExperimentsDetailsPage.Layout = Dashboard;
ProjectExperimentsDetailsPage.Sidebar = Sidebar;
export default ProjectExperimentsDetailsPage;
