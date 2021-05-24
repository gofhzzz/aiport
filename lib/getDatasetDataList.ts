import fetcher from './fetcher';

// types
import { DataInfo } from 'types/data';

const getDatasetDataList: () => Promise<DataInfo[]> = async () => {
  const { dataList } = await fetcher('/api/data');

  return dataList;
};

export default getDatasetDataList;
