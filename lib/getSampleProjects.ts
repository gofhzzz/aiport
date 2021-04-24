import fetcher from './fetcher';

const getSampleProjects: () => Promise<SampleProjectInfo[]> = async () => {
  const { projects } = await fetcher('/api/project/sample');

  return projects;
};

export default getSampleProjects;
