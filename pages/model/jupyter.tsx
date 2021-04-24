import React from 'react';

// components
import Dashboard from '@components/layout/Dashboard';
import Link from '@components/ui/Link';

const ModelJupyterPage = () => {
  return (
    <iframe className="w-full h-full" src="https://211.184.186.91:8888/lab" />
  );
};

const Sidebar = (
  <div className="py-4 flex flex-col">
    <h2 className="px-4 font-semibold text-xl">ResNet18</h2>
    <div className="mt-16 space-y-1">
      <Link className="flex px-4 py-2 bg-gray-200" href="/model/jupyter">
        <span>File</span>
      </Link>
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Visual</span>
      </Link>
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Stats</span>
      </Link>
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Invites</span>
      </Link>
      <Link className="flex px-4 py-2 hover:bg-gray-50" href="#">
        <span>Settings</span>
      </Link>
    </div>
  </div>
);

ModelJupyterPage.Layout = Dashboard;
ModelJupyterPage.Sidebar = Sidebar;
export default ModelJupyterPage;
