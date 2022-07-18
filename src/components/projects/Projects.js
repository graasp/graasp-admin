import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { PeopleOutline } from '@material-ui/icons';
import ReusableTable from '../common/ReusableTable';
import { projectsHeadCells } from '../../config/constants';

const Projects = ({ projects, title, id, elementType }) => {
  const headCells = projectsHeadCells;

  return (
    <>
      <ReusableTable
        id={id}
        rows={projects}
        tableTitle={title}
        icon={<PeopleOutline />}
        elementType={elementType}
        headCells={headCells}
      />
    </>
  );
};

Projects.propTypes = {
  projects: PropTypes.instanceOf(List).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  elementType: PropTypes.string,
};

Projects.defaultProps = {
  id: null,
  elementType: '',
};

export default Projects;
