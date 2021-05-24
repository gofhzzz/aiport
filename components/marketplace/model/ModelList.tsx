import React from 'react';
import cn from 'classnames';
import ModelItem from './ModelItem';

// types
import { ModelInfo } from 'types/model';

interface Props {
  className?: string;
  models: ModelInfo[];
}

const ModelList = ({ models, className }: Props) => {
  return (
    <div className={cn(className, 'divide-y-2')}>
      {models.map((model) => (
        <ModelItem className="p-4" model={model} key={model._id} />
      ))}
    </div>
  );
};

export default ModelList;
