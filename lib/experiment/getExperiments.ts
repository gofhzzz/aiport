import fetcher from '../fetcher';

// types
import { ExperimentInfo } from 'types/experiment';

const getExperiments: () => Promise<ExperimentInfo[]> = async () => {
  const { experiments } = await fetcher('/api/experiment');

  return experiments;
};

export default getExperiments;
