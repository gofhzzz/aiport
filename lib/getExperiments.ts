import fetcher from './fetcher';

const getExperiments: () => Promise<ExperimentInfo[]> = async () => {
  const { experiments } = await fetcher('/api/experiment');

  return experiments;
};

export default getExperiments;
