import fetcher from '../fetcher';
// types
import { ExperimentInfo } from 'types/experiment';

const getSingleExperiment: () => Promise<ExperimentInfo> = async () => {
  const { experiment } = await fetcher('/api/experiment/single');

  return experiment;
};

export default getSingleExperiment;
