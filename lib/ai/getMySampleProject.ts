import fetcher from '../fetcher';

// types
import { MySampleProjectInfo } from 'types/project';

const getMySampleProject: (id: string) => Promise<MySampleProjectInfo> = async (
  id,
) => {
  const { project } = await fetcher(`/api/project/${id}`);

  return project;
};

export default getMySampleProject;
