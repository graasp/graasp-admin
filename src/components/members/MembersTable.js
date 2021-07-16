import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { useHistory } from 'react-router';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Autocomplete } from '@material-ui/lab';
import { buildMemberPath } from '../../config/paths';
import { ORDERING, ITEM_DATA_TYPES } from '../../enums';
import { getComparator, stableSort, getRowsForPage } from '../../utils/table';
import { formatDate } from '../../utils/date';

import {
  buildMembersTableRowId,
  buildMembersTableTitle,
  MEMBERS_TABLE_EMPTY_ROW_ID,
} from '../../config/selectors';
import TableHead from '../common/TableHead';
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
    alignItems: 'center',
    margin: theme.spacing(1),
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  selected: {
    backgroundColor: `${lighten(theme.palette.primary.main, 0.85)} !important`,
  },
  hover: {
    cursor: 'pointer',
  },
  iconAndName: {
    display: 'flex',
    alignMembers: 'center',
  },
  itemName: {
    paddingLeft: theme.spacing(1),
  },
  autoComplete: {
    width: 300,
    float: 'right',
  },
}));

const MembersTable = ({ members: rows, tableTitle, id: tableId, empty }) => {
  const classes = useStyles();
  const { push } = useHistory();
  const [order, setOrder] = React.useState(ORDERING.DESC);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [orderBy, setOrderBy] = React.useState('updatedAt');
  const [selected, setSelected] = React.useState([]);
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

  const [searchValue, setSearchValue] = React.useState('');

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

  const headCells = [
    {
      id: 'name',
      numeric: false,
      label: 'Name',
      align: 'left',
    },
    {
      id: 'email',
      numeric: false,
      label: 'Email',
      align: 'right',
    },
    {
      id: 'type',
      numeric: false,
      label: 'Type',
      align: 'right',
    },
    {
      id: 'createdAt',
      numeric: false,
      label: 'Created At',
      align: 'right',
      type: ITEM_DATA_TYPES.DATE,
    },
    {
      id: 'updatedAt',
      numeric: false,
      label: 'Updated At',
      align: 'right',
      type: ITEM_DATA_TYPES.DATE,
    },
  ];

  // display empty rows to maintain the table height
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, filteredRows.size - page * rowsPerPage);

  // order and select rows to display given the current page and the number of entries displayed
  const rowsToDisplay = getRowsForPage(
    stableSort(filteredRows, getComparator(order, orderBy)),
    { page, rowsPerPage },
  );

  // transform filteredRows' information into displayable information
  const mappedRows = rowsToDisplay.map((item) => {
    const { id, updatedAt, name, createdAt, type, email } = item;
    const userNameAndIcon = (
      <span className={classes.iconAndName}>
        <AccountCircleIcon />
        <span className={classes.itemName}>{name}</span>
      </span>
    );

    return {
      id,
      name: userNameAndIcon,
      type,
      updatedAt,
      createdAt,
      email,
    };
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
    push(buildMemberPath(id));
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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.toolbarDiv}>
          {Boolean(tableTitle) && (
            <Typography
              className={classes.title}
              variant="h6"
              id={buildMembersTableTitle(tableTitle)}
              component="div"
            >
              {tableTitle}
            </Typography>
          )}
          <Autocomplete
            value={searchValue}
            freeSolo
            className={classes.autoComplete}
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
        </div>

        <TableContainer>
          <Table
            id={tableId}
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
              rowCount={filteredRows.size}
              headCells={headCells}
            />
            <TableBody>
              {mappedRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    id={buildMembersTableRowId(row.id)}
                    hover
                    tabIndex={-1}
                    key={row.id}
                    classes={{
                      hover: classes.hover,
                      selected: classes.selected,
                    }}
                  >
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
              {emptyRows > 0 && empty && (
                <TableRow
                  id={MEMBERS_TABLE_EMPTY_ROW_ID}
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
          count={filteredRows.size}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

MembersTable.propTypes = {
  members: PropTypes.instanceOf(List),
  tableTitle: PropTypes.string,
  id: PropTypes.string,
  empty: PropTypes.bool,
};

MembersTable.defaultProps = {
  id: '',
  members: List(),
  tableTitle: '',
  empty: true,
};

export default MembersTable;
