import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

// components
import Dashboard from '@components/layout/Dashboard';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Select from '@components/ui/Select';
import Link from '@components/ui/Link';

const selectItems = {
  dataset: [
    {
      name: 'COCO',
      id: 'efwa-cvze-zdss',
      public: false,
      owner: 'James',
      collaborators: ['Ahn'],
      watch: 1111,
      star: 222,
      type: 'Image/BBox',
      original: false,
      size: 13500,
      created_at: '2021-04-22',
    },
    {
      name: 'CIFAR10_processed',
      id: 'efwa-cvze-zdss',
      public: true,
      owner: 'Admin',
      collaborators: ['Admin'],
      watch: 1212,
      star: 141,
      type: 'Image/BBox',
      original: true,
      size: 2000000,
      created_at: '2021-03-27',
    },
    {
      name: 'CIFAR10',
      id: 'efwa-cvze-zdss',
      public: false,
      owner: 'James',
      collaborators: ['ahn'],
      watch: 1155,
      star: 433,
      type: 'Image/BBox',
      original: false,
      size: 2000000,
      created_at: '2021-03-28',
    },
    {
      name: 'CIFAR100_fine',
      id: 'efwa-cvze-zdss',
      public: false,
      owner: 'James',
      collaborators: ['ahn'],
      watch: 1155,
      star: 433,
      type: 'Image/BBox',
      original: false,
      size: 2000000,
      created_at: '2021-03-28',
    },
    {
      name: 'CIFAR100_coarse',
      id: 'efwa-cvze-zdss',
      public: false,
      owner: 'James',
      collaborators: ['ahn'],
      watch: 1155,
      star: 433,
      type: 'Image/BBox',
      original: false,
      size: 2000000,
      created_at: '2021-03-28',
    },
    {
      name: 'DirtyMNIST',
      id: 'efwa-cvze-zdss',
      public: false,
      owner: 'James',
      collaborators: ['ahn'],
      watch: 1155,
      star: 433,
      type: 'Image/BBox',
      original: false,
      size: 2000000,
      created_at: '2021-03-28',
    },
    {
      name: 'FinancialPhraseBank',
      id: 'efwa-cvze-zdss',
      public: false,
      owner: 'James',
      collaborators: ['ahn'],
      watch: 1155,
      star: 433,
      type: 'Image/BBox',
      original: false,
      size: 2000000,
      created_at: '2021-03-28',
    },
    {
      name: 'SST-2',
      id: 'efwa-cvze-zdss',
      public: false,
      owner: 'James',
      collaborators: ['ahn'],
      watch: 1155,
      star: 433,
      type: 'Image/BBox',
      original: false,
      size: 2000000,
      created_at: '2021-03-28',
    },
    {
      name: 'NSMC',
      id: 'efwa-cvze-zdss',
      public: false,
      owner: 'James',
      collaborators: ['ahn'],
      watch: 1155,
      star: 433,
      type: 'Image/BBox',
      original: false,
      size: 2000000,
      created_at: '2021-03-28',
    },
    {
      name: 'PAWS_Wiki',
      id: 'efwa-cvze-zdss',
      public: false,
      owner: 'James',
      collaborators: ['ahn'],
      watch: 1155,
      star: 433,
      type: 'Image/BBox',
      original: false,
      size: 2000000,
      created_at: '2021-03-28',
    },
    {
      name: 'SQUAD2',
      id: 'efwa-cvze-zdss',
      public: false,
      owner: 'James',
      collaborators: ['ahn'],
      watch: 1155,
      star: 433,
      type: 'Image/BBox',
      original: false,
      size: 2000000,
      created_at: '2021-03-28',
    },
    {
      name: 'WikiText2',
      id: 'efwa-cvze-zdss',
      public: false,
      owner: 'James',
      collaborators: ['ahn'],
      watch: 1155,
      star: 433,
      type: 'Image/BBox',
      original: false,
      size: 2000000,
      created_at: '2021-03-28',
    },
    {
      name: 'EMNIST',
      id: 'efwa-cvze-zdss',
      public: false,
      owner: 'James',
      collaborators: ['ahn'],
      watch: 1155,
      star: 433,
      type: 'Image/BBox',
      original: false,
      size: 2000000,
      created_at: '2021-03-28',
    },
  ],

  model: [
    {
      name: 'ImageModel',
      id: 'efwa-cvze-zdss',
      framework: 'Pytorch 1.8.1',
      public: false,
      owner: 'James',
      collaborators: ['Ahn'],
      watch: 1389,
      star: 351,
      category: 'Image/BBox',
      created_at: '2021-04-20',
      files: [
        '__init__.py',
        'densenet.py',
        'dla.py',
        'dla_simple.py',
        'dpn.py',
        'efficientnet.py',
        'googlenet.py',
        'lenet.py',
        'mobilenet.py',
        'mobilenetv2.py',
        'pnasnet.py',
        'preact_resnet.py',
        'regnet.py',
        'resnet.py',
        'resnext.py',
        'senet.py',
        'shufflenet.py',
        'shufflenetv2.py',
        'vgg.py',
      ],
      class_function: [
        'BasicBlock',
        'Bottleneck',
        'ResNet',
        'ResNet18',
        'ResNet34',
        'ResNet50',
        'ResNet101',
        'ResNet152',
        'test',
      ],
    },
    {
      name: 'ResNet',
      id: 'ffff-vvvv-jhgk',
      framework: 'Tensorflow 2.1',
      public: false,
      owner: 'James',
      collaborators: ['Kim'],
      watch: 141,
      star: 33,
      category: 'Image/BBox',
      created_at: '2021-04-13',
      files: ['__init__.py', 'resnet.py'],
      class_function: [
        'BasicBlock',
        'Bottleneck',
        'ResNet',
        'ResNet18',
        'ResNet34',
        'ResNet50',
        'ResNet101',
        'ResNet152',
        'test',
      ],
    },
    {
      name: 'EfficientNet',
      id: 'ffff-vvvv-jhgk',
      framework: 'Tensorflow 2.1',
      public: false,
      owner: 'James',
      collaborators: ['Kim'],
      watch: 141,
      star: 33,
      category: 'Image/BBox',
      created_at: '2021-04-13',
      files: ['__init__.py', 'efficientnet.py'],
      class_function: [
        'swish',
        'drop_connect',
        'SE',
        'Block',
        'EfficientNet',
        'EfficientNetB0',
        'test',
      ],
    },
    {
      name: 'BERT',
      id: 'ffff-vvvv-jhgk',
      framework: 'Tensorflow 2.1',
      public: false,
      owner: 'James',
      collaborators: ['Kim'],
      watch: 141,
      star: 33,
      category: 'Image/BBox',
      created_at: '2021-04-13',
      files: [
        '__init__.py',
        'bert.py',
        'language_model.py',
        'transformer.py',
        'multi_head.py',
        'single.py',
        'position.py',
        'segment.py',
        'token.py',
        'feed_forward.py',
        'gelu.py',
        'layer_norm.py',
        'sublayer.py',
      ],
      class_function: ['BERT'],
    },
    {
      name: 'T-ResNet',
      id: 'ffff-vvvv-jhgk',
      framework: 'Tensorflow 2.1',
      public: false,
      owner: 'James',
      collaborators: ['Kim'],
      watch: 141,
      star: 33,
      category: 'Image/BBox',
      created_at: '2021-04-13',
      files: ['__init__.py', 'tresnet.py'],
      class_function: [
        'swish',
        'drop_connect',
        'SE',
        'Block',
        'EfficientNet',
        'EfficientNetB0',
        'test',
      ],
    },
    {
      name: 'RoBERT',
      id: 'ffff-vvvv-jhgk',
      framework: 'Tensorflow 2.1',
      public: false,
      owner: 'James',
      collaborators: ['Kim'],
      watch: 141,
      star: 33,
      category: 'Image/BBox',
      created_at: '2021-04-13',
      files: ['__init__.py', 'robert.py'],
      class_function: [
        'swish',
        'drop_connect',
        'SE',
        'Block',
        'EfficientNet',
        'EfficientNetB0',
        'test',
      ],
    },
    {
      name: 'KoBERT',
      id: 'ffff-vvvv-jhgk',
      framework: 'Tensorflow 2.1',
      public: false,
      owner: 'James',
      collaborators: ['Kim'],
      watch: 141,
      star: 33,
      category: 'Image/BBox',
      created_at: '2021-04-13',
      files: ['__init__.py', 'kobert.py'],
      class_function: [
        'swish',
        'drop_connect',
        'SE',
        'Block',
        'EfficientNet',
        'EfficientNetB0',
        'test',
      ],
    },
    {
      name: 'XLNet',
      id: 'ffff-vvvv-jhgk',
      framework: 'Tensorflow 2.1',
      public: false,
      owner: 'James',
      collaborators: ['Kim'],
      watch: 141,
      star: 33,
      category: 'Image/BBox',
      created_at: '2021-04-13',
      files: ['__init__.py', 'xlnet.py'],
      class_function: [
        'swish',
        'drop_connect',
        'SE',
        'Block',
        'EfficientNet',
        'EfficientNetB0',
        'test',
      ],
    },
    {
      name: 'AlexNet',
      id: 'ffff-vvvv-jhgk',
      framework: 'Tensorflow 2.1',
      public: false,
      owner: 'James',
      collaborators: ['Kim'],
      watch: 141,
      star: 33,
      category: 'Image/BBox',
      created_at: '2021-04-13',
      files: ['__init__.py', 'alexnet.py'],
      class_function: [
        'swish',
        'drop_connect',
        'SE',
        'Block',
        'EfficientNet',
        'EfficientNetB0',
        'test',
      ],
    },
    {
      name: 'ALBERT',
      id: 'ffff-vvvv-jhgk',
      framework: 'Tensorflow 2.1',
      public: false,
      owner: 'James',
      collaborators: ['Kim'],
      watch: 141,
      star: 33,
      category: 'Image/BBox',
      created_at: '2021-04-13',
      files: ['__init__.py', 'albert.py'],
      class_function: [
        'swish',
        'drop_connect',
        'SE',
        'Block',
        'EfficientNet',
        'EfficientNetB0',
        'test',
      ],
    },
  ],
  trainer: {
    loss: [
      {
        name: 'CrossEntropy',
        params: {},
      },
      {
        name: 'PoissonNLLLoss',
        params: {},
      },
      {
        name: 'BCEWithLogitsLoss',
        params: {},
      },
      {
        name: 'MultiLabelSoftMarginLoss',
        params: {},
      },
      {
        name: 'TripletMarginLoss',
        params: {},
      },
    ],

    optimizer: [
      {
        name: 'Adam',
        params: {},
      },
      {
        name: 'Adamax',
        params: {},
      },
      {
        name: 'SparseAdam',
        params: {},
      },
      {
        name: 'Rprop',
        params: {},
      },
      {
        name: 'Adadelta',
        params: {},
      },
    ],

    batch_size: [0, 128],
    epoch: [0, 1000],
  },

  parameters: [
    {
      key: 'num_classes',
      type: 'discrete',
      value: 89,
    },
    {
      key: 'other',
      type: 'discrete',
      value: 11,
    },
  ],

  environment: {
    node: [
      'Nvidia GeForce RTX 3090',
      'Nvidia GeForce RTX 3080',
      'Nvidia GeForce RTX 3070',
      'Nvidia Titan RTX',
      'Nvidia GeForce RTX 2080 Ti',
      'Nvidia GeForce RTX 2060 Ti',
      'Nvidia Titan V',
      'Nvidia GeForce RTX 2080 Super',
      'Nvidia GeForce RTX 2080',
      'Nvidia GeForce RTX 2070 Super',
      'Nvidia GeForce GTX 1080 Ti',
      'CPU',
    ],
    framework: [
      'Pytorch 1.8.1',
      'Pytorch 1.7.1',
      'Pytorch 1.6.0',
      'Pytorch 1.5.1',
      'Pytorch 1.4.0',
      'Pytorch 1.3.1',
      'Pytorch 1.2.0',
      'Pytorch 1.1.0',
      'Tensorflow 2.4.1',
      'Tensorflow 2.3.2',
      'Tensorflow 2.2.0',
      'Tensorflow 2.1.3',
      'Tensorflow 2.1.0',
    ],
  },
};

const ProjectExperimentUploadPage = () => {
  const router = useRouter();

  const [selectedDataset, setSelectedDataset] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [selectedFunction, setSelectedFunction] = useState<string>('');
  const [selectedLoss, setSelectedLoss] = useState<string>('');
  const [selectedOptimizer, setSelectedOptimizer] = useState<string>('');
  const [selectedProccessor, setSelectedProccessor] = useState<string>('');
  const [selectedFramework, setSelectedFramework] = useState<string>('');

  const [parameterLength, setParameterLength] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(() => {
    setLoading(true);
    setTimeout(() => router.push('/project/experiments/details'), 500);
  }, [router]);

  return (
    <div className="mx-auto max-w-screen-xl pt-8 px-4 md:px-6 pb-32">
      <h1 className="text-3xl font-medium">New Experiments</h1>

      {/* General section */}
      <div className="mt-6 space-y-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                General
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                General experiment settings.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <Input
                    label="Experiment Name"
                    placeholder="Please enter an experiment name"
                  />
                </div>
              </div>

              <div>
                <Input
                  label="Description (Optional)"
                  placeholder="Describe your experiment here..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dataset Section */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Dataset
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Choose dataset you want to use for this experiment.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">
              <Select
                label="Dataset"
                items={[
                  { key: '-', label: 'Select', value: '' },
                  ...selectItems.dataset.map((dataset) => ({
                    key: dataset.id,
                    label: dataset.name,
                    value: dataset.name,
                  })),
                ]}
                selectedValue={selectedDataset}
                onSelect={(item) => setSelectedDataset(item.value as string)}
              />
            </div>
          </div>
        </div>

        {/* AI Model Section */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                AI Model
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Choose a model you want to use for this experiment.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">
              <Select
                label="Model"
                items={[
                  { key: '-', label: 'Select', value: '' },
                  ...selectItems.model.map((model) => ({
                    key: model.id,
                    label: model.name,
                    value: model.name,
                  })),
                ]}
                selectedValue={selectedModel}
                onSelect={(item) => setSelectedModel(item.value as string)}
              />
              <div className="sm:grid grid-cols-2 gap-6 space-y-4 sm:space-y-0">
                <div>
                  <Select
                    label="File"
                    items={[
                      { key: '-', label: 'Select', value: '' },
                      ...(selectItems.model
                        .find((model) => selectedModel === model.name)
                        ?.files.map((file) => ({
                          key: file,
                          label: file,
                          value: file,
                        })) ?? []),
                    ]}
                    selectedValue={selectedFile}
                    onSelect={(item) => setSelectedFile(item.value as string)}
                  />
                </div>
                <div>
                  <Select
                    label="Model Class/Function"
                    items={[
                      { key: '-', label: 'Select', value: '' },
                      ...(selectItems.model
                        .find((model) => selectedModel === model.name)
                        ?.class_function.map((functionName) => ({
                          key: functionName,
                          label: functionName,
                          value: functionName,
                        })) ?? []),
                    ]}
                    selectedValue={selectedFunction}
                    onSelect={(item) =>
                      setSelectedFunction(item.value as string)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trainer Section */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Trainer
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Trainer configurations like loss and optimizer functions.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">
              <div className="sm:grid grid-cols-2 gap-6 space-y-4 sm:space-y-0">
                <div>
                  <Select
                    label="Loss"
                    items={[
                      { key: '-', label: 'Select', value: '' },
                      ...selectItems.trainer.loss.map((model) => ({
                        key: model.name,
                        label: model.name,
                        value: model.name,
                      })),
                    ]}
                    selectedValue={selectedLoss}
                    onSelect={(item) => setSelectedLoss(item.value as string)}
                  />
                </div>
                <div>
                  <Select
                    label="Optimizer"
                    items={[
                      { key: '-', label: 'Select', value: '' },
                      ...selectItems.trainer.optimizer.map((model) => ({
                        key: model.name,
                        label: model.name,
                        value: model.name,
                      })),
                    ]}
                    selectedValue={selectedOptimizer}
                    onSelect={(item) =>
                      setSelectedOptimizer(item.value as string)
                    }
                  />
                </div>
              </div>
              <div className="sm:grid grid-cols-2 gap-6 space-y-4 sm:space-y-0">
                <div>
                  <Input label="Batch Size" placeholder="32" />
                </div>
                <div>
                  <Input label="Epoch" placeholder="50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parameter Section */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Parameter
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You can override all kinds of training parameters in this
                section
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">
              {Array.from({ length: parameterLength }, (_, idx) => (
                <div
                  key={`parameter-${idx}`}
                  className="sm:grid grid-cols-2 gap-6 space-y-2 sm:space-y-0"
                >
                  <div>
                    <Input label="Key" placeholder="Enter a variable name" />
                  </div>
                  <div>
                    <Input label="Value" placeholder="Enter a value" />
                  </div>
                </div>
              ))}
              <Button
                size="sm"
                color="white"
                full
                onClick={() => setParameterLength((prev) => prev + 1)}
              >
                Add Parameter
              </Button>
            </div>
          </div>
        </div>

        {/* Environment Section */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Environment
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You can choose the environment in which your experiment will be
                run.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">
              <Select
                label="Processors (CPU/GPU)"
                items={[
                  { key: '-', label: 'Select', value: '' },
                  ...selectItems.environment.node.map((node) => ({
                    key: node,
                    label: node,
                    value: node,
                  })),
                ]}
                selectedValue={selectedProccessor}
                onSelect={(item) => setSelectedProccessor(item.value as string)}
              />
              <Select
                label="Framework"
                items={[
                  { key: '-', label: 'Select', value: '' },
                  ...selectItems.environment.framework.map((framework) => ({
                    key: framework,
                    label: framework,
                    value: framework,
                  })),
                ]}
                selectedValue={selectedFramework}
                onSelect={(item) => setSelectedFramework(item.value as string)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            // disabled={
            //   loading ||
            //   !selectedDataset ||
            //   !selectedFile ||
            //   !selectedFramework ||
            //   !selectedFunction ||
            //   !selectedLoss ||
            //   !selectedModel ||
            //   !selectedOptimizer ||
            //   !selectedProccessor
            // }
          >
            Create
          </Button>
        </div>
      </div>
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

ProjectExperimentUploadPage.Layout = Dashboard;
ProjectExperimentUploadPage.Sidebar = Sidebar;
export default ProjectExperimentUploadPage;
