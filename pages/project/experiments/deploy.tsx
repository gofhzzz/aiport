import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
// components
import Dashboard from '@components/layout/Dashboard';
import Button from '@components/ui/Button';
import Link from '@components/ui/Link';
import ExperimentDownloadModal from '@components/modals/ExperimentDownloadModal';

// lib
import getSingleExperiment from '@lib/experiment/getSingleExperiment';

// icons
import Spinner from '@components/icons/Spinner';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

// types
import { ExperimentInfo } from 'types/experiment';

const outputItems: { name: string; idx: number; per: number }[] = [
  { name: 'Lee Jun Ho', idx: 1, per: 94.4 },
  { name: 'Ken Jeong', idx: 2, per: 4.8 },
  { name: 'Kim bum', idx: 3, per: 0.48 },
];

const ProjectExperimentsDetailsPage = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragOverFlag, setDragOverFlag] = React.useState<boolean>(false);
  const router = useRouter();
  const [projectInfo, setProjectInfo] = React.useState<{
    id: string;
  } | null>(null);
  const [experiment, setExperiment] = useState<ExperimentInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const [previewName, setPreviewName] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const [outputInfo, setOutputInfo] = React.useState<{
    name: string;
    idx: number;
    per: number;
  } | null>(null);

  useEffect(() => {
    setProjectInfo({
      id: '6083a1ecd7f0a9318ae5bc81',
    });

    getSingleExperiment()
      .then((exp) => setExperiment(exp))
      .catch((err) => setError(err.message));
  }, [router]);

  const handleImage = React.useCallback(async (file: File) => {
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
    setTimeout(() => {
      setLoading(false);
      setOutputInfo(outputItems[0]);
    }, 3000);
  }, []);

  if (error !== null) return <div>{error}</div>;

  if (experiment === null || !projectInfo)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );

  return (
    <>
      <div className="mx-auto max-w-screen-xl pt-8 px-4 md:px-6 pb-16">
        <div className="md:flex items-center justify-between">
          <h1 className="text-3xl font-medium flex items-center">
            <button className="hover:opacity-80" onClick={() => router.back()}>
              <ChevronLeftIcon className="w-6 h-6" />
            </button>{' '}
            <a className="hover:opacity-80 flex" href="/project/experiments">
              {`${experiment.name}`}
            </a>
            <ChevronLeftIcon className="w-6 h-6" />
            Deploy
          </h1>
        </div>
        <div className="relative mt-12">
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
                      <div className="relative w-full h-full inset-0 object-cover">
                        <img src={previewUrl} />
                      </div>
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
                          onClick={() =>
                            setOutputInfo(
                              (prev) => prev && outputItems[prev.idx - 2],
                            )
                          }
                        >
                          <ChevronLeftIcon
                            className={cn('w-12 h-12 absolute left-0 top-36')}
                          />
                        </button>
                        <button
                          className="disabled:text-gray-400 disabled:cursor-default"
                          disabled={outputInfo.idx === 3}
                          onClick={() =>
                            setOutputInfo(
                              (prev) => prev && outputItems[prev.idx],
                            )
                          }
                        >
                          <ChevronRightIcon
                            className={cn('w-12 h-12 absolute right-0 top-36')}
                          />
                        </button>
                        <p className="text-lg -mt-4 font-semibold">{`${outputInfo.idx}.${outputInfo.name}`}</p>
                        <div className="w-72 flex items-center justify-center mx-auto h-72 relative">
                          <img
                            src={`/images/dataset/data/${outputInfo.idx}.jpg`}
                            className="object-cover inset-0 absoulte"
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
                  <tr>
                    <th className="pt-4">
                      <div className="w-20 h-20 mx-auto">
                        <img src={previewUrl} className="object-cover" />
                      </div>
                    </th>
                    <th>
                      <p>{previewName}</p>
                    </th>
                    <th>
                      <p>
                        <span className="mr-2 text-lightBlue-400">
                          {outputItems[0].name}
                        </span>
                        {outputItems[0].per}%
                      </p>
                    </th>
                    <th>
                      <p>
                        <span className="mr-2 text-lightBlue-400">
                          {outputItems[1].name}
                        </span>
                        {outputItems[1].per}%
                      </p>
                    </th>
                    <th>
                      <p>
                        <span className="mr-2 text-lightBlue-400">
                          {outputItems[2].name}
                        </span>
                        {outputItems[2].per}%
                      </p>
                    </th>
                  </tr>
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
    <h2 className="px-4 font-semibold text-xl">Text Sentiment Analysis</h2>
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
