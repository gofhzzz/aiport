import React, { useEffect, useRef, useState } from 'react';
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

const logItem = [
  {
    time: 400,
    text:
      'admin@ubuntu_88:~/MLops/working/config_yaml_auto/outputs$ sudo docker build . --tag ayh2',
  },
  {
    time: 300,
    text: 'Sending build context to Docker daemon  377.9kB',
  },
  {
    time: 300,
    text:
      'Step 1/11 : FROM pytorchlightning/pytorch_lightning:base-cuda-py3.8-torch1.7',
  },
  {
    time: 800,
    text: '---> bd4c8561a79e',
  },
  {
    time: 400,
    text:
      'Step 2/11 : RUN apt-get update           && apt-get install -y python3-pip python3-dev           && cd /usr/local/bin           && ln -s /usr/bin/python3 python           && pip3 install --upgrade pip',
  },
  {
    time: 800,
    text: '---> Using cache',
  },
  {
    time: 1200,
    text: '---> 57f2482b1b7b',
  },
  {
    time: 500,
    text:
      'Step 3/11 : RUN apt-get update &&             apt-get upgrade -y &&             apt-get install -y git',
  },
  {
    time: 400,
    text: '---> Using cache',
  },
  {
    time: 2000,
    text: '---> e51e5d69fda3',
  },
  {
    time: 800,
    text: 'Step 4/11 : WORKDIR /home/ubuntu',
  },
  {
    time: 500,
    text: '---> Using cache',
  },
  {
    time: 1000,
    text: '---> 72729adf3c97',
  },
  {
    time: 600,
    text:
      'Step 5/11 : RUN git clone https://github.com/joowon-dm-snu/ais-client.git',
  },
  {
    time: 500,
    text: '---> Using cache',
  },
  {
    time: 2500,
    text: '---> 2a2042b46038',
  },
  {
    time: 600,
    text: 'Step 6/11 : WORKDIR /home/ubuntu/ais-client',
  },
  {
    time: 600,
    text: '---> Using cache',
  },
  {
    time: 2000,
    text: '---> 2ade1a5556cc',
  },
  {
    time: 600,
    text: 'Step 7/11 : RUN pip install -r requirements.txt',
  },
  {
    time: 600,
    text: '---> Using cache',
  },
  {
    time: 2000,
    text: '---> a06bf6de1d65',
  },
  {
    time: 600,
    text: 'Step 8/11 : RUN pip install -e . --user',
  },
  {
    time: 600,
    text: '---> Using cache',
  },
  {
    time: 2500,
    text: '---> a5513c058cf9',
  },
  {
    time: 600,
    text: 'Step 9/11 : RUN pip install pytorch-lightning',
  },
  {
    time: 600,
    text: '---> Using cache',
  },
  {
    time: 2000,
    text: '---> 5ff3a95e5795',
  },
  {
    time: 600,
    text:
      'Step 10/11 : RUN python main.py --task 4e1b04c2-4dc8-4c69-91a9-cd413e1104d0',
  },
  {
    time: 600,
    text: '---> Using cache',
  },
  {
    time: 2000,
    text: '---> 40e67fb3a9c6',
  },
  {
    time: 600,
    text:
      'Step 11/11 : CMD [python, /home/ubuntu/ais-client/from_server/user_train.py]',
  },
  {
    time: 1000,
    text: '---> Using cache',
  },
  {
    time: 3000,
    text: '---> f53b5ca3f691',
  },
  {
    time: 500,
    text: 'Successfully built f53b5ca3f691',
  },
  {
    time: 600,
    text: 'Successfully tagged ayh2:latest',
  },
];

const ProjectExperimentsDetailsPage = () => {
  const [selectedItem, setSelectedItem] = useState<string>('overview');
  const [show, setShow] = useState<boolean>(false);
  const [logText, setLogText] = useState<string[]>([]);
  const [showRunModal, setShowRunModal] = useState<boolean>(false);
  const router = useRouter();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleLogging = React.useCallback(async () => {
    for (const item of logItem) {
      await new Promise((resolve) => {
        timer.current = setTimeout(() => {
          setLogText((prev) => [...prev, item.text]);
          resolve(item.text);
        }, item.time);
      });
    }
  }, []);
  const cancelTimer = React.useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);
  useEffect(() => cancelTimer(), [cancelTimer]);

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
          {logText.length !== 0 && (
            <div className="mt-10">
              <p className="text-xl font-semibold">Log</p>
              <div className="rounded-sm bg-black overflow-y-scroll p-4 pb-16 mt-4">
                {logText.map((text, idx) => (
                  <p className="text-green-400 text-sm" key={`${text}-${idx}`}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          )}
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
      <ExperimentRunModal
        show={showRunModal}
        setShow={setShowRunModal}
        onRunning={() => handleLogging()}
      />
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
