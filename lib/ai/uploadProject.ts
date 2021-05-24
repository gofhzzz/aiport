import fetcher from '../fetcher';
// types
import { ProjectInput } from 'types/project';

const uploadProject: (project: ProjectInput) => Promise<string> = async (
  project,
) => {
  const { projectId } = await fetcher('/api/project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });

  return projectId;
};

export default uploadProject;
