export interface ExperimentInfo {
  _id: string;
  name: string;
  status: 'Running' | 'Done' | 'Not Started';
  user: string;
  epoch: string;
  trainLoss: number;
  validationLoss: number;
  score: number;
  dataset: string;
  model: string;
  loss: string;
  optimizer: string;
  batchSize: number;
  parameter: string;
  initialization: string;
  framework: string;
  createdTime: string;
  startTime: string;
  lastRunTime: string;
  runningTime: string;
  deploy: boolean;
}

export {};
