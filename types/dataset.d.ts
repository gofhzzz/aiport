interface DatasetInfo {
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

interface DatasetInput {
  name: string;
  type: string;
  size: string;
  isOriginal: boolean;
  isPublic: boolean;
}
