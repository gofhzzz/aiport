import React from 'react';
// import cn from 'classnames';

import {
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
} from '@heroicons/react/outline';

// components
import Common from '@components/layout/Common';
import Button from '@components/ui/Button';

const features = [
  { name: 'Push to Deploy', icon: CloudUploadIcon },
  { name: 'SSL Certificates', icon: LockClosedIcon },
  { name: 'Simple Queues', icon: RefreshIcon },
  { name: 'Advanced Security', icon: ShieldCheckIcon },
  { name: 'Powerful API', icon: CogIcon },
  { name: 'Database Backups', icon: ServerIcon },
];

const IndexPage = () => {
  return (
    <div>
      <div className="bg-lightBlue-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            <span className="block">Where the world builds AI</span>
            <span className="block text-lightBlue-600 mt-4">
              Focus on your data and model,
              <br />
              we’ll take care of the rest.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button>Start for free</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bg-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <h2 className="text-base font-semibold tracking-wider text-lightBlue-600 uppercase">
            Deploy faster
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Everything you need to deploy your app
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
            Phasellus lorem quam molestie id quisque diam aenean nulla in.
            Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend
            condimentum id viverra nulla.
          </p>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-lightBlue-500 rounded-md shadow-lg">
                          <feature.icon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        Ac tincidunt sapien vehicula erat auctor pellentesque
                        rhoncus. Et magna sit morbi lobortis.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

IndexPage.Layout = Common;
export default IndexPage;
