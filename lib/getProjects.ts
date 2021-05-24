import fetcher from './fetcher';

// types
import { ProjectInfo } from 'types/project';

const getProjects: () => Promise<ProjectInfo[]> = async () => {
  const { projects } = await fetcher('/api/project');

  return projects;
};

export default getProjects;
