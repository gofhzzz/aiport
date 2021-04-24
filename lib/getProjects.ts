import fetcher from './fetcher';

const getProjects: () => Promise<ProjectInfo[]> = async () => {
  const { projects } = await fetcher('/api/project');

  return projects;
};

export default getProjects;
