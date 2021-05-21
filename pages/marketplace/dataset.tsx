import React from 'react';
import { useRouter } from 'next/router';

// components
import Dashboard from '@components/layout/Dashboard';
import SearchItem from '@components/marketplace/SearchItem';
import DatasetDetail from '@components/marketplace/dataset/DatasetDetail';

// labraries
import getDataset from '@lib/getDataset';

// icons
import Spinner from '@components/icons/Spinner';
import getDatasets from '@lib/getDatasets';

const DatasetDetailPage = () => {
  const router = useRouter();
  const [dataset, setDataset] = React.useState<DatasetInfo | null>(null);
  const [otherDataset, setOtherDataset] = React.useState<DatasetInfo[] | null>(
    null,
  );

  React.useEffect(() => {
    if (router.query.id && typeof router.query.id === 'string') {
      getDataset(router.query.id).then((dataset) => setDataset(dataset));
    }
    if (dataset !== null)
      getDatasets().then((datasets) =>
        setOtherDataset(datasets.filter((val) => val.name !== dataset.name)),
      );
  }, [router, dataset]);

  if (dataset === null || otherDataset === null)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );
  return (
    <div className="mt-8">
      <SearchItem initialDropdownItem="dataset" />
      <DatasetDetail
        otherDataset={otherDataset}
        dataset={dataset}
        className="p-8"
      />
    </div>
  );
};

export default DatasetDetailPage;
DatasetDetailPage.Layout = Dashboard;
