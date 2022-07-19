import React from 'react';
import { useTranslation } from 'react-i18next';
import { mockProjects } from '../../config/constants';
// import { Loader } from '@graasp/ui';
// import { hooks } from '../../config/queryClient';
import Projects from '../projects/Projects';

// const { useAllMembers } = hooks;

const ProjectsView = () => {
  const { t } = useTranslation();
  // const { data: allMembers, isLoading } = useAllMembers();

  // if (isLoading) {
  //   return <Loader />;
  // }

  const projects = mockProjects;

  return (
    <Projects
      title={t('All Projects')}
      projects={projects}
      elementType="project"
    />
  );
};

export default ProjectsView;
