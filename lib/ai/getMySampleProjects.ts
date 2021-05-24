import fetcher from '../fetcher';
// types
import { MySampleProjectInfo } from 'types/project';

const getMySampleProjects: () => Promise<MySampleProjectInfo[]> = async () => {
  const { projects } = await fetcher('/api/project/sample/myprojects');

  return projects;
};

export default getMySampleProjects;
