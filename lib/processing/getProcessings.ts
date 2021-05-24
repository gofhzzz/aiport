import fetcher from '../fetcher';
// types
import { Processing } from 'types/processing';

const getProcessings: () => Promise<Processing[]> = async () => {
  const { processings } = await fetcher('/api/processing');

  return processings;
};

export default getProcessings;
