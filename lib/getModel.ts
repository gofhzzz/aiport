import fetcher from './fetcher';
// types
import { ModelInfo } from 'types/model';

const getModel: (id: string) => Promise<ModelInfo> = async (id) => {
  const { model } = await fetcher(`/api/model/${id}`);

  return model;
};

export default getModel;
