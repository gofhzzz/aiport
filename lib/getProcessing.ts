import fetcher from './fetcher';

const getProcessing: (processingId: string) => Promise<Processing> = async (
  processingId,
) => {
  const { processing } = await fetcher(`/api/processing/${processingId}`);

  return processing;
};

export default getProcessing;
