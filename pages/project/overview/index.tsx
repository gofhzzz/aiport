import React from 'react';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';

const ProjectOverviewPage = () => {
  return (
    <div className="py-64">
      <h1 className="text-4xl font-medium text-center">Preparing...</h1>
    </div>
  );
};

const Sidebar = (
  <div className="py-4 flex flex-col">
    <h2 className="px-4 font-semibold text-xl">
      MNIST IMG
      <br />
      Recognition
    </h2>
    <div className="mt-16 space-y-1">
      <Link className="flex px-4 py-2 bg-gray-200" href="/project/overview">
        <span>Overview</span>
      </Link>
      <Link
        className="flex px-4 py-2 hover:bg-gray-50"
        href="/project/experiments"
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
