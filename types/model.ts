export interface ModelInfo {
  _id: string;
  name: string;
  framework: string;
  isPublic: boolean;
  owner: string;
  collaborators: string[];
  watch: number;
  star: number;
  created: string;
}

export interface ModelInput {
  name: string;
  framework: string;
  isPublic: boolean;
}

export {};
