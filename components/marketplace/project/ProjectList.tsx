import React from 'react';
import ProjectItem from './ProjectItem';
import cn from 'classnames';

// types
import { SampleProjectInfo } from 'types/project';

interface Props {
  className?: string;
  projects: SampleProjectInfo[];
}

const ProjectList = ({ className, projects }: Props) => {
  return (
    <div className={cn(className, 'divide-y-2')}>
      {projects.map((project) => (
        <ProjectItem className="p-4" project={project} key={project._id} />
      ))}
    </div>
  );
};

export default ProjectList;
