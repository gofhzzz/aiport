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
      name: 'CelebA',
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
      name: 'Financial Phrase Bank',
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
      name: 'MNIST',
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

  Loss: [
    'BCE with Logits Loss',
    'Cross Entropy',
    'Hinge',
    'KL Loss',
    'MAE',
    'MSE',
    'Multi-Label Soft Margin Loss',
    'Poisson NLL Loss',
    'Triplet Margin Loss',
  ],

  Optimizer: ['Ada Delta', 'Adam', 'Adamax', 'Sparse Adam', 'SGD', 'Rprop'],

  Scheduler: [
    'Constant LR',
    'Cosine Annealing LR',
    'Cyclic LR',
    'Exponential LR',
    'Lambda LR',
    'Multiplicative LR',
    'Multi-step LR',
    'Step-wise LR',
  ],

  originalModel: [
    'AlexNet',
    'Bert for classification',
    'EfficientNet',
    'Faster R-CNN',
    'GoogLeNet',
    'GPT-2',
    'VGG',
    'DETR',
    'ResNet',
  ],

  preTrain: ['epoch30_val91.pt'],

  processing: ['new', 'processing_1'],

  Model: [
    'epoch30_val85.pt',
    'epoch50_val93_adam_resnet.pt',
    'epoch50_val93_adam_resnet.pt',
    'epoch50_val86_adam_mobile.pt',
    'epoch50_val94_adam_mobileLarge.pt',
    'epoch30_val91.pt',
  ],
  ModelItem: [
    'FasterRCNN',
    'fasterrcnn_resnet50_fpn',
    'fasterrcnn_mobilenet_v3_large_320_fpn',
    'fasterrcnn_mobilenet_v3_large_fpn',
  ],

  newInitialization: ['He', 'Normal', 'Normalized Xavier', 'Xavier'],

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
  const [selectedModelItem, setSelectedModelItem] = useState<string>('');
  const [preTrained, setPreTrained] = useState<string>('');
  const [selectedLoss, setSelectedLoss] = useState<string[]>(['']);
  const [selectedInitialization, setSelectedInitialization] = useState<string>(
    '',
  );
  const [selectedOptimizer, setSelectedOptimizer] = useState<string>('');
  const [selectedScheduler, setSelectedScheduler] = useState<string>('');
  const [selectedProcessing, setSelectedProcessing] = useState<string>('');
  const [parameterLength, setParameterLength] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(() => {
    setLoading(true);
    setTimeout(() => router.push('/project/experiments/details/empty'), 500);
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
                Experiment name and description
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
                Choose dataset you want to use for this experiment
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
              <Select
                label="Processing"
                items={[
                  { key: '-', label: 'Select', value: '' },
                  ...selectItems.processing.map((val) => ({
                    key: val,
                    label: val,
                    value: val,
                  })),
                ]}
                selectedValue={selectedProcessing}
                onSelect={(item) => setSelectedProcessing(item.value as string)}
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
                Choose AI model you want to use for this experiment. Also,
                overwrite a parameter for this experiment
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">
              <Select
                label="Model Name"
                items={[
                  { key: '-', label: 'Select', value: '' },
                  ...selectItems.originalModel.map((val) => ({
                    key: val,
                    label: val,
                    value: val,
                  })),
                ]}
                selectedValue={selectedModel}
                onSelect={(item) => setSelectedModel(item.value as string)}
              />
              <div className="sm:grid grid-cols-2 gap-6 space-y-4 sm:space-y-0">
                <div>
                  <Select
                    label="Model"
                    items={[
                      { key: '-', label: 'Select', value: '' },
                      ...selectItems.ModelItem.map((val) => ({
                        key: val,
                        label: val,
                        value: val,
                      })),
                    ]}
                    selectedValue={selectedModelItem}
                    onSelect={(item) =>
                      setSelectedModelItem(item.value as string)
                    }
                  />
                </div>
                <div>
                  <Select
                    label="Pre-tranined"
                    items={[
                      { key: '-', label: 'Select', value: '' },
                      ...selectItems.preTrain.map((val) => ({
                        key: val,
                        label: val,
                        value: val,
                      })),
                    ]}
                    selectedValue={preTrained}
                    onSelect={(item) => setPreTrained(item.value as string)}
                  />
                </div>
              </div>

              <Select
                label="Initialization"
                items={[
                  { key: '-', label: 'Select', value: '' },
                  ...selectItems.newInitialization.map((val) => ({
                    key: val,
                    label: val,
                    value: val,
                  })),
                ]}
                selectedValue={selectedInitialization}
                onSelect={(item) =>
                  setSelectedInitialization(item.value as string)
                }
              />
              <h3 className="text-md font-medium leading-6 text-gray-900">
                Parameter(Overwrite)
              </h3>
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
        </div>

        {/* Trainer Section */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Trainer
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Trainer configuration such as loss function and optimizer
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">
              <div className="sm:grid grid-cols-2 gap-6 space-y-4 sm:space-y-0">
                {
                  <div>
                    {selectedLoss.map((val, idx) => (
                      <Select
                        key={`${idx}`}
                        label={`Loss ${idx + 1}`}
                        className="mb-2"
                        items={[
                          { key: '-', label: 'Select', value: '' },
                          ...selectItems.Loss.map((val) => ({
                            key: val,
                            label: val,
                            value: val,
                          })),
                        ]}
                        selectedValue={val}
                        onSelect={(item) =>
                          setSelectedLoss((prev) =>
                            prev.map((value, index) => {
                              if (index === idx) return item.value as string;
                              return value;
                            }),
                          )
                        }
                      />
                    ))}
                    <Button
                      size="sm"
                      className="mt-2"
                      color="white"
                      full
                      onClick={() => setSelectedLoss((prev) => [...prev, ''])}
                    >
                      Add Loss
                    </Button>
                  </div>
                }
                <div>
                  <Select
                    label="Optimizer"
                    items={[
                      { key: '-', label: 'Select', value: '' },
                      ...selectItems.Optimizer.map((val) => ({
                        key: val,
                        label: val,
                        value: val,
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

        {/* Environment Section */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                LR Scheduler
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Learning rate & Scheduler
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2 space-y-6">
              <Input label="Learning Rate" placeholder="0.0001" />

              <Select
                label="Scheduler"
                items={[
                  { key: '-', label: 'Select', value: '' },
                  ...selectItems.Scheduler.map((val) => ({
                    key: val,
                    label: val,
                    value: val,
                  })),
                ]}
                selectedValue={selectedScheduler}
                onSelect={(item) => setSelectedScheduler(item.value as string)}
              />
              <div className="sm:grid grid-cols-2 gap-6 space-y-4 sm:space-y-0">
                <div>
                  <Input label="Step Size" placeholder="10" />
                </div>
                <div>
                  <Input label="Gamma" placeholder="0.1" />
                </div>
              </div>
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
    <h2 className="px-4 font-semibold text-xl">New Celebrity</h2>
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
