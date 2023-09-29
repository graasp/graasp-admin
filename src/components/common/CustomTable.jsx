import React, { useEffect, useState } from 'react';

import { Autocomplete } from '@mui/lab';
import { Box, Checkbox, Stack, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { List } from 'immutable';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  DEFAULT_LOCALE,
  EMPTY_ROW_HEIGHT,
  ROWS_PER_PAGE_OPTIONS,
} from '../../config/constants';
import {
  ITEMS_TABLE_EMPTY_ROW_ID,
  buildTableCheckBox,
  buildTableId,
  buildTableRowId,
  buildTableTitle,
} from '../../config/selectors';
import {  ORDERING } from '../../enums';
import { getComparator, getRowsForPage, stableSort } from '../../utils/table';
import TableHead from './TableHead';
import { useNavigate } from 'react-router';
import { formatDate } from '@graasp/sdk';

const CustomTable = ({
  rows,
  headCells,
  tableTitle,
  tableType,
  empty,
  search,
  link,
  title,
  checkBox,
}) => {
  const  push  = useNavigate();
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
    if (!searchValue) {
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === ORDERING.ASC;
    setOrder(isAsc ? ORDERING.DESC : ORDERING.ASC);
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    const checked =
      JSON.parse(event.target.dataset.indeterminate) || !event.target.checked;
    if (!checked) {
      const newSelecteds = rowsToDisplay.map((n) => n.id).toJS();
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
      case 'date':
        return formatDate(value, {locale: DEFAULT_LOCALE});
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClick = (event, id) => {
    const checked = isSelected(id);
    if (checked) {
      removeItemsFromSelected([id]);
    } else {
      addItemsInSelected([id]);
    }
  };

  return (
    <Box>
      <Paper elevation={0}>
        <Stack>
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
              inputValue={searchValue}
              options={options}
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
        </Stack>
        <TableContainer>
          <Table
            id={buildTableId(tableType, tableTitle)}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <TableHead
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
              {rowsToDisplay.map((row, index) => {
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
    </Box>
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
  iconInfo: PropTypes.arrayOf(PropTypes.string),
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
  iconInfo: [],
};

export default CustomTable;
