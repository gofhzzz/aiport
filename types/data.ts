export interface DataInfo {
  _id: string;
  name: string;
  project: string[];
  type: string;
  imageUrl: string;
  uploader: string;
  created: string;
}

export interface DatasetDataInfo {
  _id: string;
  name: string;
  split: string;
  x_1: number;
  y_1: number;
  width: number;
  height: number;
  label: number;
}

export {};
