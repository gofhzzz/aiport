import React, { useEffect, useState } from 'react';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';
import getSingleExperiment from '@lib/getSingleExperiment';
import Button from '@components/ui/Button';
import ExperimentDownloadModal from '@components/modals/ExperimentDownloadModal';

const ProjectExperimentsDetailsPage = () => {
  const [experiment, setExperiment] = useState<ExperimentInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    getSingleExperiment()
      .then((exp) => setExperiment(exp))
      .catch((err) => setError(err.message));
  }, []);

  if (error !== null) return <div>{error}</div>;

  if (experiment === null)
    return <p className="text-center mt-16">loading...</p>;

  return (
    <>
      <div className="mx-auto max-w-screen-xl pt-8 px-4 md:px-6 pb-16">
        <div className="md:flex items-center justify-between">
          <h1 className="text-3xl font-medium">{experiment.name}</h1>
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
    <h2 className="px-4 font-semibold text-xl">SST2_BERT</h2>
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
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Settings</span>
      </Link>
    </div>
  </div>
);

ProjectExperimentsDetailsPage.Layout = Dashboard;
ProjectExperimentsDetailsPage.Sidebar = Sidebar;
export default ProjectExperimentsDetailsPage;
