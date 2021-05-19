import React from 'react';
import ProjectItem from './ProjectItem';
import cn from 'classnames';

interface Props {
  className?: string;
  projects: SampleProjectInfo[];
}

const ProjectList = ({ className, projects }: Props) => {
  return (
    <div className={cn(className, 'divide-y-2')}>
      {projects.map((project, idx) => (
        <ProjectItem
          className="p-4"
          project={project}
          key={project._id}
          src={`/images/project/sample/clone_cover_${idx + 1}.jpg`}
        />
      ))}
    </div>
  );
};

export default ProjectList;
