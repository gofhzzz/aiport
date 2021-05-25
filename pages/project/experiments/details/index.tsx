import React, { useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';

// components
import Dashboard from '@components/layout/Dashboard';
import Button from '@components/ui/Button';
import Link from '@components/ui/Link';
import ExperimentDownloadModal from '@components/modals/ExperimentDownloadModal';
import ExperimentRunModal from '@components/modals/ExperimentRunModa';

// utils
import formatDate from '@utils/formatDate';

// icons
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/outline';

const navItems = ['overview', 'edit', 'visualization', 'tensorboard'];

const ProjectExperimentsDetailsPage = () => {
  const [selectedItem, setSelectedItem] = useState<string>('overview');
  const [show, setShow] = useState<boolean>(false);
  const [showRunModal, setShowRunModal] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="mx-auto max-w-screen-xl pt-8 px-4 md:px-6 pb-16 w-full">
      <div className="md:flex items-center justify-between">
        <h1 className="text-3xl font-medium flex items-center">
          <button onClick={() => router.back()}>
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          exp1
        </h1>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <Button>
            <Link href="/project/experiments/deploy">Deploy</Link>
          </Button>
          <Button color="white" onClick={() => setShow(true)}>
            Download
          </Button>
          <Button
            onClick={() => setShowRunModal(true)}
            className="!w-32"
            color="lightBlue"
          >
            Run
          </Button>
          <Button className="!w-32" color="red">
            Stop
          </Button>
        </div>
      </div>
      <div className="relative flex justify-between mt-12">
        <div className="flex space-x-12">
          {navItems.map((item, idx) => (
            <button
              key={`${item}-${idx}`}
              onClick={() => setSelectedItem(item)}
            >
              <p
                className={cn('capitalize text-xl font-semibold', {
                  'text-lightBlue-500': item === selectedItem,
                })}
              >
                {item}
              </p>
            </button>
          ))}
        </div>
        <p className="text-xl text-gray-500">Menu</p>
      </div>
      <div className="w-full border-t border-gray-300 mt-2" />
      {selectedItem !== 'visualization' ? (
        <div>
          <div className="py-4 mt-10 max-w-7xl mx-auto shadow-lg rounded-md">
            <div className="justify-around flex text-md font-semibold">
              <div className="text-left pl-4 flex-grow">
                <p className="pb-4">
                  Start Time:{' '}
                  <span className="font-normal">2021-05-25 PM 1:50 </span>
                </p>
                <p>
                  Last Run Time:{' '}
                  <span className="font-normal">2021-05-25 PM 2:52 </span>
                </p>
              </div>
              <div className="border-r border-gray-300" />
              <div className="flex-grow pl-4">
                <p className="pb-4">
                  Created Time:{' '}
                  <span className="font-normal">2021-05-25 PM 1:48</span>
                </p>
                <p>
                  Image: <span className="font-normal">Pytorch 1.8.1</span>
                </p>
              </div>
            </div>
          </div>
          <div className="py-4 mt-10 max-w-7xl mx-auto shadow-lg rounded-md">
            <div className="flex items-center pl-4 pb-8">
              <ChevronDownIcon className="w-6 h-6 mr-2" />
              <p className="text-2xl font-semibold">Progress</p>
            </div>
            <div className="justify-around flex text-md font-semibold">
              <div className="text-left pl-4 flex-grow">
                <p className="pb-4">
                  Train Loss: <span className="font-normal">0.337</span>
                </p>
                <p>
                  Valid Loss: <span className="font-normal">0.598</span>
                </p>
              </div>
              <div className="border-r border-gray-300" />
              <div className="flex-grow pl-4">
                <p className="pb-4">
                  Score: <span className="font-normal">92.3</span>
                </p>
                <p>
                  Epoch: <span className="font-normal">50/50</span>
                </p>
              </div>
            </div>
          </div>
          <div className="py-4 mt-10 max-w-7xl mx-auto shadow-lg rounded-md">
            <div className="flex items-center pl-4 pb-8">
              <ChevronDownIcon className="w-6 h-6 mr-2" />
              <p className="text-2xl font-semibold">Experiment Settings</p>
            </div>
            <div className="justify-around flex text-md font-semibold">
              <div className="text-left pl-4 flex-grow">
                <p className="pb-4">
                  Dataset: <span className="font-normal">CelebA</span>
                </p>
                <p>
                  Processing:{' '}
                  <span className="font-normal">Processing_CelebA_1</span>
                </p>
              </div>
              <div className="border-r border-gray-300" />
              <div className="flex-grow pl-4">
                <p className="pb-4">
                  Model Name: <span className="font-normal">Faster R-CNN</span>
                </p>
                <p className="pb-4">
                  Model:{' '}
                  <span className="font-normal">
                    fasterrcnn_mobilenet_v3_large_fpn
                  </span>
                </p>
                <p className="pb-4">
                  Pre-trained:{' '}
                  <span className="font-normal"> epoch30_val91.pt</span>
                </p>
                <div>
                  <span className="border-b-2 border-black">Parameter</span>
                  <p>
                    num_class: <span className="font-normal">10117</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 mt-10 max-w-7xl mx-auto shadow-lg rounded-md">
            <div className="flex items-center pl-4 pb-8">
              <ChevronDownIcon className="w-6 h-6 mr-2" />
              <p className="text-2xl font-semibold">Hyperparameters</p>
            </div>
            <div className="justify-around flex text-md font-semibold">
              <div className="text-left pl-4 flex-grow">
                <p className="pb-4">
                  Initialization:{' '}
                  <span className="font-normal">He Initialization</span>
                </p>
                <p>
                  Loss: <span className="font-normal">[Cross Entropy]</span>
                </p>
              </div>
              <div className="border-r border-gray-300" />
              <div className="flex-grow pl-4">
                <p className="pb-4">
                  Optimizer: <span className="font-normal">Adam</span>
                </p>
                <p>
                  Batch size: <span className="font-normal">32</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>text</div>
      )}

      <ExperimentDownloadModal show={show} setShow={setShow} />
      <ExperimentRunModal show={showRunModal} setShow={setShowRunModal} />
    </div>
  );
};

const Sidebar = (
  <div className="py-4 flex flex-col">
    <h2 className="px-4 font-semibold text-xl">Image Recognition AI</h2>
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
