import fetcher from './fetcher';

// types
import { DatasetInfo } from 'types/dataset';

const getDatasets: () => Promise<DatasetInfo[]> = async () => {
  const { datasets } = await fetcher('/api/dataset');

  return datasets;
};

export default getDatasets;
