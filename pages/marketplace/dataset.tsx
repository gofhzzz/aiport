import React from 'react';
import { useRouter } from 'next/router';

// components
import Dashboard from '@components/layout/Dashboard';
import SearchItem from '@components/marketplace/SearchItem';

// labraries
import getDataset from '@lib/getDataset';

// icons
import Spinner from '@components/icons/Spinner';
const DatasetDetailPage = () => {
  const router = useRouter();
  const [dataset, setDataset] = React.useState<DatasetInfo | null>(null);

  React.useEffect(() => {
    if (router.query.id && typeof router.query.id === 'string') {
      getDataset(router.query.id).then((dataset) => setDataset(dataset));
    }
  }, [router]);

  if (!dataset)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );
  return (
    <div>
      <SearchItem initialDropdownItem="dataset" />
      {JSON.stringify(dataset)}
    </div>
  );
};

export default DatasetDetailPage;
DatasetDetailPage.Layout = Dashboard;
