import fetcher from './fetcher';
// types
import { ModelInput } from 'types/model';

const uploadModel: (model: ModelInput) => Promise<string> = async (model) => {
  const { modelId } = await fetcher('/api/model', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(model),
  });

  return modelId;
};

export default uploadModel;
