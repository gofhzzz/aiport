import React from 'react';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';

const DatasetProcessingPage = () => {
  return (
    <div className="py-64">
      <h1 className="text-4xl font-medium text-center">Preparing...</h1>
    </div>
  );
};

const Sidebar = (
  <div className="py-4 flex flex-col">
    <h2 className="px-4 font-semibold text-xl">COCO_Aug</h2>
    <div className="mt-16 space-y-1">
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="/dataset/data">
        <span>Data</span>
      </Link>
      <Link className="flex px-4 py-2 bg-gray-200" href="/dataset/processing">
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

DatasetProcessingPage.Layout = Dashboard;
DatasetProcessingPage.Sidebar = Sidebar;
export default DatasetProcessingPage;
