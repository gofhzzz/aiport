import fetcher from './fetcher';

const getModels: () => Promise<ModelInfo[]> = async () => {
  const { models } = await fetcher('/api/model');

  return models;
};

export default getModels;
