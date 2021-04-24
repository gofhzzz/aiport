interface ProjectInfo {
  _id: string;
  name: string;
  isPublic: boolean;
  collaborators: string[];
  experiments: number;
  deployments: number;
  running: number;
  created: string;
  lastUpdated: string;
}

interface ProjectInput {
  name: string;
}
