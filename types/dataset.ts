export interface DatasetInfo {
  _id: string;
  name: string;
  isPublic: boolean;
  owner: string;
  watch: number;
  size: number;
  star: number;
  price: number;
  dataType: string;
  task: string;
  description: string;
  src: string;
  created: string;
  lastUpdated: string;
}

export interface DatasetInput {
  name: string;
  type: string;
  size: string;
  isOriginal: boolean;
  isPublic: boolean;
}

export const initialDatasetInput: DatasetInput = {
  name: '',
  type: '',
  size: '',
  isOriginal: true,
  isPublic: true,
};

export {};
