import fetcher from './fetcher';

const getSingleExperiment: () => Promise<ExperimentInfo> = async () => {
  const { experiment } = await fetcher('/api/experiment/single');

  return experiment;
};

export default getSingleExperiment;
