import fetcher from './fetcher';
// types
import { SampleProjectInfo } from 'types/project';

const getSampleProject: (id: string) => Promise<SampleProjectInfo> = async (
  id,
) => {
  const { sample } = await fetcher(`/api/project/sample/${id}`);

  return sample;
};

export default getSampleProject;
