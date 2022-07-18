import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import TableHead from '../common/TableHead';

import { environmentHeadCells } from '../../config/constants';
import ViewRepositoryButton from '../common/ViewRepositoryButton';

const useStyles = makeStyles(() => ({}));
const VersionsTable = ({ versions }) => {
  const classes = useStyles();
  const headCells = environmentHeadCells;

  const renderActions = (row) => {
    const actions = [];
    actions.push(
      <ViewRepositoryButton repository={row.repository} key="view" />,
    );
    return actions;
  };

  return (
    <Box>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <TableHead headCells={headCells} />
          <TableBody>
            {versions.map((row) => {
              return (
                <TableRow
                  // hover
                  tabIndex={-1}
                  key={row.id}
                  classes={{
                    hover: classes.hover,
                    selected: classes.selected,
                  }}
                >
                  <TableCell scope="row">{row.repository}</TableCell>
                  <TableCell align="right">{row.tag}</TableCell>
                  <TableCell align="right">{renderActions(row)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

VersionsTable.propTypes = {
  versions: PropTypes.instanceOf(Array).isRequired,
};

VersionsTable.defaultProps = {};

export default VersionsTable;
