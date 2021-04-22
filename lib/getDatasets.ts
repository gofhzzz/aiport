import fetcher from './fetcher';

const getDatasets: () => Promise<DatasetInfo[]> = async () => {
  const { datasets } = await fetcher('/api/dataset');

  return datasets;
};

export default getDatasets;
