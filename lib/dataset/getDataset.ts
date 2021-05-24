import fetcher from '../fetcher';

// types
import { DatasetInfo } from 'types/dataset';

const getDataset: (id: string) => Promise<DatasetInfo> = async (id) => {
  const { dataset } = await fetcher(`/api/dataset/${id}`);

  return dataset;
};

export default getDataset;
