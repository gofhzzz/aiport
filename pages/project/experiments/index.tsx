import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import NextLink from 'next/link';
import { useDebounce } from 'react-use';
import { SearchIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

import {
  // CubeTransparentIcon,
  PlusIcon,
} from '@heroicons/react/outline';

// contexts
import { useUI } from '@components/ui/context';

// components
import Dashboard from '@components/layout/Dashboard';
import Button from '@components/ui/Button';
import Link from '@components/ui/Link';
import AiSidebar from '@components/sidebar/AiSidebar';

// libraries
import getExperiments from '@lib/getExperiments';

// icons
import { AIIcon } from '@components/icons';
import Spinner from '@components/icons/Spinner';

interface ExperimentInfoWithChecked extends ExperimentInfo {
  checked: boolean;
}

const ProjectExperimentsPage = () => {
  const router = useRouter();
  const [experiments, setExperiments] = useState<
    ExperimentInfoWithChecked[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const totalExperiments = useRef<ExperimentInfoWithChecked[]>([]);

  const [projectInfo, setProjectInfo] = React.useState<{
    id: string;
    name: string;
  } | null>(null);

  const { showNoti } = useUI();

  useDebounce(
    () => {
      setExperiments((prev) => {
        if (prev === null) return null;
        if (!searchKey) return totalExperiments.current;
        return prev.filter(({ name }) => name.includes(searchKey));
      });
    },
    1000,
    [searchKey],
  );

  useEffect(() => {
    if (
      router.query.projectId &&
      typeof router.query.projectId === 'string' &&
      router.query.projectName &&
      typeof router.query.projectName === 'string'
    )
      setProjectInfo({
        id: router.query.projectId,
        name: router.query.projectName,
      });

    getExperiments()
      .then((experiments) => {
        totalExperiments.current = experiments.map((experiment) => ({
          ...experiment,
          checked: false,
        }));
        setExperiments(
          experiments.map((experiment) => ({
            ...experiment,
            checked: false,
          })),
        );
      })
      .catch((err) => setError(err.message));
  }, [router]);

  if (error !== null) return <div>{error}</div>;

  if (!projectInfo)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );

  return (
    <div className="flex w-full h-full">
      <AiSidebar projectId={projectInfo.id} projectName={projectInfo.name} />
      <div className="mx-auto max-w-screen-xl pt-8 px-4 md:px-6 w-full">
        <h1 className="text-3xl font-medium">Experiments</h1>

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
                  placeholder="Search experiments..."
                  type="search"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                />
              </div>
            </div>
            {/* button groups */}
            <div className="flex items-center flex-shrink-0 space-x-4">
              <NextLink href="/project/experiments/upload">
                <Button size="sm">
                  <PlusIcon className="w-5 h-5 mr-2" />
                  <span>New Experiment</span>
                </Button>
              </NextLink>
            </div>
          </div>
        </section>

        {/* additional button group */}
        <section className="my-4 flex space-x-4 justify-end md:justify-start items-center">
          <Button
            size="sm"
            color="white"
            disabled={
              experiments === null ||
              !experiments.find(({ checked }) => checked)
            }
            onClick={() => {
              showNoti({ variant: 'alert', title: '준비중인 기능입니다.' });
            }}
          >
            Compare
          </Button>
          <Button
            size="sm"
            color="white"
            disabled={
              experiments === null ||
              !experiments.find(({ checked }) => checked)
            }
            onClick={() => {
              showNoti({ variant: 'alert', title: '준비중인 기능입니다.' });
            }}
          >
            Download
          </Button>
          <Button
            size="sm"
            color="white"
            disabled={
              experiments === null ||
              !experiments.find(({ checked }) => checked)
            }
            onClick={() => {
              showNoti({ variant: 'alert', title: '준비중인 기능입니다.' });
            }}
          >
            Tensorboard
          </Button>
        </section>

        {/* model list section */}
        <section className="mt-8">
          {experiments === null ? (
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
                                setExperiments(
                                  experiments.map((experiment) => ({
                                    ...experiment,
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
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            User
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Epoch
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            T-Loss
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            V-Loss
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Score
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">View</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {experiments.map((experiment, idx) => (
                          <tr key={experiment._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              <input
                                className="rounded-sm"
                                type="checkbox"
                                checked={experiment.checked}
                                onChange={(e) => {
                                  if (!e.target.checked) {
                                    const elem = document.getElementById(
                                      'check-all-input',
                                    ) as HTMLInputElement;
                                    elem.checked = false;
                                  }
                                  setExperiments(
                                    experiments.map((prev, idx2) =>
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
                              <span>{experiment.name}</span>
                            </td>
                            <td
                              className={cn(
                                'px-6 py-4 whitespace-nowrap text-center text-sm',
                                {
                                  'text-red-400': experiment.status === 'Done',
                                  'text-green-500 font-medium':
                                    experiment.status === 'Running',
                                },
                              )}
                            >
                              {experiment.status}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                              {experiment.user}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                              {experiment.epoch.current} /{' '}
                              {experiment.epoch.total}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                              {experiment.trainLoss}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                              {experiment.validationLoss}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                              {experiment.score}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                href={`/project/experiments/details?projectId=${projectInfo.id}&projectName=${projectInfo.name}`}
                                className="text-lightBlue-600 hover:text-lightBlue-900"
                              >
                                View
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
    </div>
  );
};

ProjectExperimentsPage.Layout = Dashboard;
export default ProjectExperimentsPage;
