export interface ModelInfo {
  _id: string;
  name: string;
  isPublic: boolean;
  owner: string;
  watch: number;
  star: number;
  price: number;
  dataType: string;
  task: string;
  description: string;
  src: string;
  framework: string;
  created: string;
  lastUpdated: string;
  pretrained: number;
}

export interface ModelInput {
  name: string;
  framework: string;
  isPublic: boolean;
}

export const initialModelInput: ModelInput = {
  name: '',
  framework: '',
  isPublic: true,
};

export {};
