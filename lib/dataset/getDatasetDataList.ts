import fetcher from '../fetcher';

// types
import { DatasetDataInfo } from 'types/data';

const getDatasetDataList: () => Promise<DatasetDataInfo[]> = async () => {
  const { dataList } = await fetcher('/api/data');

  return dataList;
};

export default getDatasetDataList;
