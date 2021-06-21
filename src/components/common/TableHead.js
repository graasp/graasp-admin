import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { ORDERING } from '../../enums';

const CustomTableHead = (props) => {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  const { t } = useTranslation();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : ORDERING.ASC}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === ORDERING.DESC
                    ? t('sorted descending')
                    : t('sorted ascending')}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

CustomTableHead.propTypes = {
  classes: PropTypes.shape({
    visuallyHidden: PropTypes.string.isRequired,
  }).isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(Object.values(ORDERING)).isRequired,
  orderBy: PropTypes.string.isRequired,
  headCells: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default CustomTableHead;
