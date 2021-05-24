import fetcher from '../fetcher';
// types
import { ModelInfo } from 'types/model';

const getModels: () => Promise<ModelInfo[]> = async () => {
  const { models } = await fetcher('/api/model');

  return models;
};

export default getModels;
