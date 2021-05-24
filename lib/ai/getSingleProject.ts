import fetcher from '../fetcher';
// types
import { ProjectInfo } from 'types/project';

const getSingleProject: () => Promise<ProjectInfo> = async () => {
  const { project } = await fetcher('/api/project/single');

  return project;
};

export default getSingleProject;
