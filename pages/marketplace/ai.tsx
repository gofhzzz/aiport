import React from 'react';
import { useRouter } from 'next/router';

// libraries
import getSampleProject from '@lib/ai/getSampleProject';
import getSampleProjects from '@lib/ai/getSampleProjects';

// components
import SearchItem from '@components/marketplace/SearchItem';
import Dashboard from '@components/layout/Dashboard';
import ProjectDetail from '@components/marketplace/project/ProjectDetail';

// icons
import Spinner from '@components/icons/Spinner';

// types
import { SampleProjectInfo } from 'types/project';

const ProjectDetailPage = () => {
  const router = useRouter();
  const [project, setProject] = React.useState<SampleProjectInfo | null>(null);
  const [otherProject, setOtherProject] = React.useState<
    SampleProjectInfo[] | null
  >(null);

  React.useEffect(() => {
    if (router.query.id && typeof router.query.id === 'string') {
      getSampleProject(router.query.id).then((sample) => setProject(sample));
    }
    if (project !== null)
      getSampleProjects().then((projects) =>
        setOtherProject(projects.filter((val) => val.name !== project.name)),
      );
  }, [router, project]);

  if (project === null || otherProject === null)
    return (
      <div className="h-[404px] flex justify-center items-center">
        <Spinner className="w-12 h-12 animate-spin" />
      </div>
    );
  return (
    <div className="mt-8">
      <SearchItem initialDropdownItem="ai" />
      <ProjectDetail
        otherProject={otherProject}
        project={project}
        className="p-8"
      />
    </div>
  );
};

export default ProjectDetailPage;
ProjectDetailPage.Layout = Dashboard;
