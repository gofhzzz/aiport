import fetcher from '../fetcher';
// types
import { Processing } from 'types/processing';

const getProcessing: (processingId: string) => Promise<Processing> = async (
  processingId,
) => {
  const { processing } = await fetcher(`/api/processing/${processingId}`);

  return processing;
};

export default getProcessing;
