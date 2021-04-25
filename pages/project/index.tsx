import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useDebounce } from 'react-use';
import { SearchIcon } from '@heroicons/react/solid';
import { PlusIcon } from '@heroicons/react/outline';

// components
import Dashboard from '@components/layout/Dashboard';
import SectionTitle from '@components/core/SectionTitle';
import Button from '@components/ui/Button';

// libraries
import getProjects from '@lib/getProjects';
import Link from '@components/ui/Link';

const lastActiveText = ['2 min', '4 days', '10 days'];

const ProjectListPage = () => {
  const [projects, setProjects] = useState<ProjectInfo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState<string>('');

  useDebounce(
    () => {
      setProjects((prev) => {
        if (prev === null) return null;
        return prev.filter(({ name }) => name.includes(searchKey));
      });
    },
    1000,
    [searchKey],
  );

  useEffect(() => {
    getProjects()
      .then((projects) => {
        setProjects(
          projects.map((model) => ({
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
      <SectionTitle picture="/icon/project.png" title="Project" />

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
                placeholder="Search projects..."
                type="search"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
          </div>
          {/* button groups */}
          <div className="flex items-center flex-shrink-0 space-x-4">
            <NextLink href="/project/upload">
              <Button size="sm">
                <PlusIcon className="w-5 h-5 mr-2" />
                <span>New Project</span>
              </Button>
            </NextLink>
          </div>
        </div>
      </section>

      {/* model list section */}
      <section>
        {projects === null ? (
          <p className="text-center font-medium mt-12">loading...</p>
        ) : (
          <div className="md:mt-12 py-6 gap-6 grid-cols-2 md:grid lg:grid-cols-3 lg:gap-10 max-w-screen-xl mx-auto">
            {projects.map((project, idx) => (
              <Link
                key={project._id}
                className="w-full rounded-md overflow-hidden shadow-md group flex flex-col max-w-md md:max-w-none mx-auto my-8 lg:my-0"
                href="/project/overview"
              >
                <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    className="object-cover transform duration-300 transition-transform group-hover:scale-110"
                    src={`/images/project/img${idx + 1}.png`}
                    loading="lazy"
                  />
                </div>
                <div className="px-4 flex-grow">
                  <h5 className="mt-2 pb-2 font-semibold border-b-2 border-gray-300">
                    {project.name}
                  </h5>
                  <ul className="my-5 list-none list-inside space-y-1.5">
                    <li className="flex items-center space-x-3">
                      <span
                        className="border-2 border-gray-700 w-2 h-2 rounded-full"
                        aria-hidden="true"
                      />
                      <span className="font-medium">
                        {project.experiments} Experiments
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span
                        className="border-2 border-gray-700 w-2 h-2 rounded-full"
                        aria-hidden="true"
                      />
                      <span className="font-medium">
                        {project.deployments} Deployments
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span
                        className="border-2 border-green-700 w-2 h-2 rounded-full"
                        aria-hidden="true"
                      />
                      <span className="font-medium">
                        {project.running} Running
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-end items-center p-4 space-x-2">
                  {project.collaborators.map((name) => (
                    <span
                      key={name}
                      className="uppercase font-semibold text-gray-700 w-8 h-8 rounded-full border border-gray-300 flex justify-center items-center shadow"
                    >
                      {name[0]}
                    </span>
                  ))}
                </div>
                <div className="border-t border-gray-300 py-2 flex items-center px-4">
                  <span className="text-sm">
                    Active {lastActiveText[idx]} ago
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

ProjectListPage.Layout = Dashboard;
export default ProjectListPage;
