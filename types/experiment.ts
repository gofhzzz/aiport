export interface ExperimentInfo {
  _id: string;
  name: string;
  status: 'Running' | 'Done';
  user: string;
  epoch: {
    current: number;
    total: number;
  };
  trainLoss: number;
  validationLoss: number;
  score: number;
}

export {};
