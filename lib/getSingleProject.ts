import fetcher from './fetcher';

const getSingleProject: () => Promise<ProjectInfo> = async () => {
  const { project } = await fetcher('/api/project/single');

  return project;
};

export default getSingleProject;
