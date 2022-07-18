import React from 'react';
import { useTranslation } from 'react-i18next';
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

  const projects = [
    {
      id: '1234',
      name: 'HUB4S',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'HUN4S@graasp.org',
    },
    {
      id: '1235',
      name: 'GRAASP',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'graasp@graasp.org',
    },
  ];
  return (
    <Projects
      title={t('All Projects')}
      projects={projects}
      elementType="project"
    />
  );
};

export default ProjectsView;
