import React from 'react';
import { useRouter } from 'next/router';

// components
import Dashboard from '@components/layout/Dashboard';
import SearchItem from '@components/marketplace/SearchItem';
import ModelDetail from '@components/marketplace/model/ModelDetail';

// libraries
import getModel from '@lib/getModel';

// icons
import Spinner from '@components/icons/Spinner';
import getModels from '@lib/getModels';

// types
import { ModelInfo } from 'types/model';

const ModelDetailPage = () => {
  const router = useRouter();
  const [model, setModel] = React.useState<ModelInfo | null>(null);
  const [otherModel, setOtherModel] = React.useState<ModelInfo[] | null>(null);

  React.useEffect(() => {
    if (router.query.id && typeof router.query.id === 'string') {
      getModel(router.query.id).then((model) => setModel(model));
    }

    if (model !== null)
      getModels().then((models) =>
        setOtherModel(models.filter((val) => val.name !== model.name)),
      );
  }, [router, model]);

  if (model === null || otherModel === null)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );
  return (
    <div className="mt-8">
      <SearchItem initialDropdownItem="model" />
      <ModelDetail model={model} className="p-8" otherModel={otherModel} />
    </div>
  );
};

export default ModelDetailPage;
ModelDetailPage.Layout = Dashboard;
