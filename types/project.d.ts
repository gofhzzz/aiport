interface ProjectInfo {
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

interface SampleProjectInfo {
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

interface ProjectInput {
  name: string;
}
