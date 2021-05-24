import fetcher from './fetcher';

// types
import { ExperimentInfo } from 'types/experiment';

const getRunningExperiments: () => Promise<ExperimentInfo[]> = async () => {
  const { experiments } = await fetcher<{ experiments: ExperimentInfo[] }>(
    '/api/experiment',
  );

  return experiments.filter((experiment) => experiment.status === 'Running');
};

export default getRunningExperiments;
