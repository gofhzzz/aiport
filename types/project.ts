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
  isPublic: boolean;
  owner: string;
  watch: number;
  star: number;
  price: number;
  dataType: string;
  task: string;
  description: string;
  src: string;
  created: string;
  lastUpdated: string;
}

export interface MySampleProjectInfo {
  _id: string;
  name: string;
  isPublic: boolean;
  owner: string;
  watch: number;
  star: number;
  price: number;
  dataType: string;
  task: string;
  src: string;
  description: string;
  totalExperiments: number;
  deploy: number;
  running: number;
  lastActive: string;
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
