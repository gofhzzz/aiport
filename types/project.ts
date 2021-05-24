export interface ProjectInfo {
  _id: string;
  name: string;
  isPublic: boolean;
  owner: string;
  collaborators: string[];
  experiments: number;
  deployments: number;
  running: number;
  created: string;
  lastUpdated: string;
}

export interface SampleProjectInfo {
  _id: string;
  name: string;
  task: string;
  isPublic: boolean;
  owner: string;
  collaborators: string[];
  watch: number;
  star: number;
  price: number;
  created: string;
  lastUpdated: string;
}

export interface ProjectInput {
  name: string;
  description: string;
}

export const initialProjectInput: ProjectInput = {
  name: '',
  description: '',
};

export {};
