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
          Exp_new
        </h1>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
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
                <p className="pb-4">Start Time: {'-'}</p>
                <p>Last Run Time: {'-'}</p>
              </div>
              <div className="border-r border-gray-300" />
              <div className="flex-grow pl-4">
                <p className="pb-4">
                  Created Time: {formatDate(String(new Date()))}
                </p>
                <p>Image: nvidia-pytorch-1.8.1</p>
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
                <p className="pb-4">Train Loss:</p>
                <p>Valid Loss:</p>
              </div>
              <div className="border-r border-gray-300" />
              <div className="flex-grow pl-4">
                <p className="pb-4">Score:</p>
                <p>Epoch: 0/50</p>
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
                <p className="pb-4">Dataset: CelebA</p>
                <p>Processing: Processing_CelebA_1</p>
              </div>
              <div className="border-r border-gray-300" />
              <div className="flex-grow pl-4">
                <p className="pb-4">Model Name: Faster R-CNN</p>
                <p className="pb-4">Model: fasterrcnn_mobilenet_v3_large_fpn</p>
                <p className="pb-4">Pre-trained: epoch30_val91.pt</p>
                <div>
                  <span className="border-b-2 border-black">Parameter</span>
                  <p>num_class: 10117</p>
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
                <p className="pb-4">Initialization: He Initialization</p>
                <p>Loss: [Cross Entropy]</p>
              </div>
              <div className="border-r border-gray-300" />
              <div className="flex-grow pl-4">
                <p className="pb-4">Optimizer: Adam</p>
                <p>Batch size: 32</p>
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
    <h2 className="px-4 font-semibold text-xl">
      Celebrity Look-alike Recommender
    </h2>
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
