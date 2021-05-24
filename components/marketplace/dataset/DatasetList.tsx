import React from 'react';
import cn from 'classnames';
import DatasetItem from './DatasetItem';

// types
import { DatasetInfo } from 'types/dataset';

interface Props {
  className?: string;
  datasets: DatasetInfo[];
}

const DatasetList = ({ datasets, className }: Props) => {
  return (
    <div className={cn(className, 'divide-y-2')}>
      {datasets.map((dataset) => (
        <DatasetItem className="p-4" dataset={dataset} key={dataset._id} />
      ))}
    </div>
  );
};

export default DatasetList;
