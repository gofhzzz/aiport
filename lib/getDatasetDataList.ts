import fetcher from './fetcher';

const getDatasetDataList: () => Promise<DataInfo[]> = async () => {
  const { dataList } = await fetcher('/api/data');

  return dataList;
};

export default getDatasetDataList;
