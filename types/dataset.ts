export interface DatasetInfo {
  _id: string;
  name: string;
  type: string;
  size: number;
  isOriginal: boolean;
  isPublic: boolean;
  owner: string;
  collaborators: string[];
  watch: number;
  star: number;
  created: string;
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
