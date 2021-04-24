import React, { useState } from 'react';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';
import Button from '@components/ui/Button';
import ExperimentDownloadModal from '@components/modals/ExperimentDownloadModal';

const ProjectExperimentsDetailsPage = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div className="mx-auto max-w-screen-xl pt-8 px-4 md:px-6 pb-16">
        <div className="md:flex items-center justify-between">
          <h1 className="text-3xl font-medium">ResNET18_COCO</h1>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Button color="white" onClick={() => setShow(true)}>
              Download
            </Button>
            <Button className="!w-32" color="lightBlue">
              Run
            </Button>
            <Button className="!w-32" color="red">
              Stop
            </Button>
          </div>
        </div>
        <div className="relative mt-12">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
        </div>
        <div className="h-80 flex justify-center items-center">
          <h3 className="text-xl font-semibold">Preparing...</h3>
        </div>
      </div>
      <ExperimentDownloadModal show={show} setShow={setShow} />
    </>
  );
};

const Sidebar = (
  <div className="py-4 flex flex-col">
    <h2 className="px-4 font-semibold text-xl">Image Recognition Project</h2>
    <div className="mt-16 space-y-1">
      <Link
        className="flex px-4 py-2 hover:bg-gray-50"
        href="/project/overview/empty"
      >
        <span>Overview</span>
      </Link>
      <Link
        className="flex px-4 py-2 bg-gray-200"
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

ProjectExperimentsDetailsPage.Layout = Dashboard;
ProjectExperimentsDetailsPage.Sidebar = Sidebar;
export default ProjectExperimentsDetailsPage;
