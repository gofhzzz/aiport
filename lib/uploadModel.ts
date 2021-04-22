import fetcher from './fetcher';

const uploadModel: (model: {
  name: string;
  framework: string;
  type: 'public' | 'private';
}) => Promise<string> = async ({ name, framework, type }) => {
  const { modelId } = await fetcher('/api/model', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, framework, type }),
  });

  return modelId;
};

export default uploadModel;
