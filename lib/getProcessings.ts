import fetcher from './fetcher';

const getProcessings: () => Promise<Processing[]> = async () => {
  const { processings } = await fetcher('/api/processing');

  return processings;
};

export default getProcessings;
