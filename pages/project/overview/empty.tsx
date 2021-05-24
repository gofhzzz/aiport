import React from 'react';
import NextLink from 'next/link';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';
import Button from '@components/ui/Button';
import { PlusIcon } from '@heroicons/react/outline';

// types
import { ProjectInfo } from 'types/project';
import { FeedInfo } from 'types/feed';
import { ExperimentInfo } from 'types/experiment';

const ProjectOverviewPage = () => {
  const project: ProjectInfo = {
    _id: '-',
    name: 'img_clf',
    isPublic: true,
    owner: 'Admin',
    collaborators: [],
    experiments: 0,
    deployments: 0,
    running: 0,
    created: '',
    lastUpdated: '',
  };

  const feeds: FeedInfo[] = [];
  const runningExperiments: ExperimentInfo[] = [];

  return (
    <div className="pb-32">
      <div className="aspect-h-6 md:aspect-h-3 aspect-w-16">
        <div className="bg-gray-400" aria-hidden="true" />
      </div>
      <div className="max-w-screen-xl mx-auto pt-8 px-4 md:px-6">
        {/* title section */}
        <section className="md:flex justify-between md:space-x-4">
          <h1 className="text-3xl font-medium">{project.name}</h1>
          <div className="my-3 md:my-0">
            <NextLink href="/project/experiments/upload">
              <Button size="sm">
                <PlusIcon className="w-6 h-6" />
                <span>New Experiment</span>
              </Button>
            </NextLink>
          </div>
        </section>

        {/* stats section */}
        <section className="mt-5">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Experiments
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {project.experiments.toLocaleString()}
              </dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Deployments
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {project.deployments.toLocaleString()}
              </dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Running
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {project.running.toLocaleString()}
              </dd>
            </div>
          </dl>
        </section>

        {/* feeds and running experiments section */}
        <section className="mt-5 xl:mt-8 xl:grid grid-cols-12 gap-5 space-y-5 xl:space-y-0">
          <div className="rounded-lg shadow p-4 bg-white col-span-5 2xl:col-span-4">
            <h4 className="text-lg font-medium">Feeds</h4>
            {feeds.length === 0 ? (
              <div className="h-[400px] grid place-items-center">
                There is no feed yet!
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {feeds.map((feed) => (
                  <li key={feed._id} className="py-4">
                    <div className="flex space-x-3">
                      <span className="h-8 w-8 rounded-full uppercase shadow-md border border-gray-200 flex justify-center items-center">
                        {feed.name[0]}
                      </span>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">
                            {feed.experiment}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {feed.timestamp}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">{feed.message}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-lg shadow p-4 bg-white col-span-7 2xl:col-span-8">
            <h4 className="text-lg font-medium">Running Experiments</h4>
            {runningExperiments.length === 0 ? (
              <div className="h-[400px] grid place-items-center">
                There is no experiments yet!
              </div>
            ) : (
              <div className="mt-5 flex flex-col">
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
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Epoch
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell xl:hidden 2xl:table-cell"
                            >
                              TrainL
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell xl:hidden 2xl:table-cell"
                            >
                              ValL
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Score
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">View</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {runningExperiments.map((experiment, idx) => (
                            <tr
                              key={experiment._id}
                              className={
                                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                              }
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-[120px] xl:max-w-none truncate">
                                {experiment.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {experiment.epoch.current} /{' '}
                                {experiment.epoch.total}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell xl:hidden 2xl:table-cell">
                                {experiment.trainLoss}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell xl:hidden 2xl:table-cell">
                                {experiment.validationLoss}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {experiment.score}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link
                                  href="/project/experiments/deploy"
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
          </div>
        </section>
      </div>
    </div>
  );
};

const Sidebar = (
  <div className="py-4 flex flex-col">
    <h2 className="px-4 font-semibold text-xl">img_clf</h2>
    <div className="mt-16 space-y-1">
      <Link
        className="flex px-4 py-2 bg-gray-200"
        href="/project/overview/empty"
      >
        <span>Overview</span>
      </Link>
      <Link
        className="flex px-4 py-2 hover:bg-gray-50"
        href="/project/experiments/empty"
      >
        <span>Experiments</span>
      </Link>
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Settings</span>
      </Link>
    </div>
  </div>
);

ProjectOverviewPage.Layout = Dashboard;
ProjectOverviewPage.Sidebar = Sidebar;
export default ProjectOverviewPage;
