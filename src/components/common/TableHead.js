import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { ORDERING } from '../../enums';

const CustomTableHead = (props) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    checkBox,
  } = props;
  const { t } = useTranslation();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {checkBox && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': t('select all items') }}
              color="primary"
            />
          </TableCell>
        )}
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
              {orderBy === headCell.id && (
                <span className={classes.visuallyHidden}>
                  {order === ORDERING.DESC
                    ? t('sorted descending')
                    : t('sorted ascending')}
                </span>
              )}
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(Object.values(ORDERING)).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  checkBox: PropTypes.bool,
};

CustomTableHead.defaultProps = {
  checkBox: false,
};
export default CustomTableHead;
