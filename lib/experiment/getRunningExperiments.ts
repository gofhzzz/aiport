import fetcher from '../fetcher';

// types
import { ExperimentInfo } from 'types/experiment';

const getRunningExperiments: () => Promise<ExperimentInfo[]> = async () => {
  const { experiments } = await fetcher<{ experiments: ExperimentInfo[] }>(
    '/api/experiment',
  );

  return experiments;
};

export default getRunningExperiments;
