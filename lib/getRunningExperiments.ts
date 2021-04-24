import fetcher from './fetcher';

const getRunningExperiments: () => Promise<ExperimentInfo[]> = async () => {
  const { experiments } = await fetcher('/api/experiment');

  return experiments.filter(
    (experiment: ExperimentInfo) => experiment.status === 'Running',
  );
};

export default getRunningExperiments;
