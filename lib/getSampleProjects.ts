import fetcher from './fetcher';
// types
import { SampleProjectInfo } from 'types/project';

const getSampleProjects: () => Promise<SampleProjectInfo[]> = async () => {
  const { projects } = await fetcher('/api/project/sample');

  return projects;
};

export default getSampleProjects;
