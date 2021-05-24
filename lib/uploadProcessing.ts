import fetcher from './fetcher';
//types
import { ProcessingStep } from 'types/processing';

const uploadProcessing: (
  augmentations: ProcessingStep[][],
  preprocessing: ProcessingStep[],
  template: { name: string; type: string },
) => Promise<void> = async (augmentations, preprocessing, template) => {
  await fetcher('/api/processing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ augmentations, preprocessing, template }),
  });
};

export default uploadProcessing;
