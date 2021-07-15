import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import _ from 'lodash';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Checkbox, Chip, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router';
import { ORDERING, ITEM_DATA_TYPES } from '../../enums';
import { getComparator, stableSort, getRowsForPage } from '../../utils/table';
import { formatDate } from '../../utils/date';
import TableHead from './TableHead';
import {
  buildTableCheckBox,
  buildTableId,
  buildTableRowId,
  buildTableTitle,
  ITEMS_TABLE_EMPTY_ROW_ID,
} from '../../config/selectors';
import {
  EMPTY_ROW_HEIGHT,
  ROWS_PER_PAGE_OPTIONS,
} from '../../config/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  toolbarDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignPermissions: 'center',
    margin: theme.spacing(2),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  selected: {
    backgroundColor: `${lighten(
      theme.palette.primary.selected,
      0.85,
    )} !important`,
  },
  hover: {
    cursor: 'pointer',
  },
  iconAndName: {
    display: 'flex',
    alignPermissions: 'center',
  },
  itemName: {
    paddingLeft: theme.spacing(1),
  },
  arrayCell: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const CustomTable = ({
  rows,
  headCells,
  tableTitle,
  tableType,
  empty,
  search,
  link,
  icon,
  iconCell,
  title,
  checkBox,
  arrayCell,
}) => {
  const classes = useStyles();
  const { push } = useHistory();
  const [order, setOrder] = React.useState(ORDERING.DESC);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [orderBy, setOrderBy] = React.useState('updatedAt');
  const [selected, setSelected] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    ROWS_PER_PAGE_OPTIONS[0],
  );

  const options = filteredRows
    .toArray()
    .map((item) => {
      return item.name;
    })
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  useEffect(() => {
    if (searchValue === '') {
      setFilteredRows(rows);
    } else {
      setFilteredRows(
        rows.filter((row) =>
          row.name.toLowerCase().startsWith(searchValue.toLowerCase()),
        ),
      );
    }
  }, [rows, searchValue]);

  // display empty rows to maintain the table height
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, filteredRows.size - page * rowsPerPage);

  // order and select rows to display given the current page and the number of entries displayed
  const rowsToDisplay = getRowsForPage(
    stableSort(filteredRows, getComparator(order, orderBy)),
    { page, rowsPerPage },
  );

  // transform filteredRows' information into displayable information
  const mappedRows = rowsToDisplay.map((row) => {
    const allowed = headCells.map((cell) => cell.id);
    allowed.push('id');
    const display = _.pick(row, allowed);

    if (iconCell) {
      display[iconCell] = (
        <span className={classes.iconAndName}>
          {icon}
          <span className={classes.itemName}>{display[iconCell]}</span>
        </span>
      );
    }

    if (arrayCell) {
      display[arrayCell] = (
        <div className={classes.arrayCell}>
          {display[arrayCell].map((d) => (
            <Chip size="small" label={d} />
          ))}
        </div>
      );
    }

    return display;
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === ORDERING.ASC;
    setOrder(isAsc ? ORDERING.DESC : ORDERING.ASC);
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    const checked =
      JSON.parse(event.target.dataset.indeterminate) || !event.target.checked;
    if (!checked) {
      const newSelecteds = mappedRows.map((n) => n.id).toJS();
      return setSelected(newSelecteds);
    }
    return setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnClickRow = ({ id }) => {
    push(link(id));
  };

  // format entry data given type
  const formatRowValue = ({ value, type }) => {
    switch (type) {
      case ITEM_DATA_TYPES.DATE:
        return formatDate(value);
      default:
        return value;
    }
  };

  const removeItemsFromSelected = (items) => {
    const newSelected = selected.filter((id) => !items.includes(id));
    setSelected(newSelected);
  };

  const addItemsInSelected = (items) => {
    const newSelected = selected.concat(items);
    setSelected(newSelected);
  };

  const handleClick = (event, id) => {
    const checked = selected.indexOf(id) !== -1;
    if (checked) {
      removeItemsFromSelected([id]);
    } else {
      addItemsInSelected([id]);
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.toolbarDiv}>
          {title && (
            <Typography
              variant="h6"
              id={buildTableTitle(tableType, tableTitle)}
              component="div"
            >
              {tableTitle}
            </Typography>
          )}
          {search && (
            <Autocomplete
              value={searchValue}
              freeSolo
              onInputChange={(event, newValue) => {
                setSearchValue(newValue);
              }}
              id="controllable-states-demo"
              inputValue={searchValue}
              options={options}
              style={{ width: 300, float: 'right' }}
              renderInput={(params) => (
                <TextField
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  {...params}
                  margin="dense"
                  label="Search"
                  variant="outlined"
                />
              )}
            />
          )}
        </div>
        <TableContainer>
          <Table
            id={buildTableId(tableType, tableTitle)}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <TableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.size}
              headCells={headCells}
              checkBox={checkBox}
            />
            <TableBody>
              {mappedRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    id={buildTableRowId(tableType, tableTitle, row.id)}
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    classes={{
                      hover: classes.hover,
                      selected: classes.selected,
                    }}
                  >
                    {checkBox && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          className={buildTableCheckBox(tableType)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                          color="primary"
                        />
                      </TableCell>
                    )}
                    {headCells.map(({ id: field, align, type }, idx) => (
                      <TableCell
                        key={field}
                        align={align}
                        component="th"
                        id={labelId}
                        scope="row"
                        onClick={() => {
                          // do not navigate when clicking on actions
                          const shouldNavigate = idx !== headCells.length - 1;
                          if (shouldNavigate) {
                            handleOnClickRow(row);
                          }
                        }}
                      >
                        {formatRowValue({ value: row[field], type })}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && !empty && (
                <TableRow
                  id={ITEMS_TABLE_EMPTY_ROW_ID}
                  style={{ height: EMPTY_ROW_HEIGHT * emptyRows }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          component="div"
          count={rows.size}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

CustomTable.propTypes = {
  rows: PropTypes.instanceOf(List),
  title: PropTypes.bool,
  tableTitle: PropTypes.string.isRequired,
  tableType: PropTypes.string.isRequired,
  empty: PropTypes.bool,
  search: PropTypes.bool,
  checkBox: PropTypes.bool,
  iconCell: PropTypes.string,
  icon: PropTypes.node,
  headCells: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  link: PropTypes.func.isRequired,
  arrayCell: PropTypes.string,
};

CustomTable.defaultProps = {
  rows: List(),
  empty: false,
  search: false,
  iconCell: '',
  icon: null,
  title: false,
  checkBox: false,
  arrayCell: '',
};

export default CustomTable;
