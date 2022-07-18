import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
// import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Breadcrumbs, Link, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Apps } from '@material-ui/icons';
// import { buildItemPath } from '../../config/paths';
import { ORDERING, ITEM_DATA_TYPES } from '../../enums';
import { getComparator, stableSort, getRowsForPage } from '../../utils/table';
import { formatDate } from '../../utils/date';
import ItemIcon from './ItemIcon';
import TableHead from '../common/TableHead';
import {
  buildItemsTableRowId,
  buildItemsTableTitle,
  ITEMS_TABLE_EMPTY_ROW_ID,
} from '../../config/selectors';
import {
  AUTO_COMPLETE_WIDTH,
  EMPTY_ROW_HEIGHT,
  ROWS_PER_PAGE_OPTIONS,
} from '../../config/constants';
// import { getShortcutTarget } from '../../utils/itemExtra';

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
  collectionsLink: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    alignItems: 'center',
  },
  itemName: {
    paddingLeft: theme.spacing(1),
  },
  autoComplete: {
    width: AUTO_COMPLETE_WIDTH,
    float: 'right',
  },
}));

const ItemsTable = ({ items: rows, tableTitle, id: tableId, empty }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  // const { push } = useHistory();
  const [filteredRows, setFilteredRows] = useState(rows);
  const [order, setOrder] = React.useState(ORDERING.DESC);
  const [orderBy, setOrderBy] = React.useState('updatedAt');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    ROWS_PER_PAGE_OPTIONS[0],
  );
  const options = filteredRows
    // .toArray()
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
      label: t('Name'),
      align: 'left',
    },
    {
      id: 'type',
      numeric: false,
      label: t('Type'),
      align: 'right',
    },
    {
      id: 'creator',
      numeric: false,
      label: t('Owner'),
      align: 'right',
    },
    {
      id: 'createdAt',
      numeric: false,
      label: t('Created At'),
      align: 'right',
      type: ITEM_DATA_TYPES.DATE,
    },
    {
      id: 'updatedAt',
      numeric: false,
      label: t('Updated At'),
      align: 'right',
      type: ITEM_DATA_TYPES.DATE,
    },
  ];

  // display empty rows to maintain the table height
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.size - page * rowsPerPage);

  // order and select rows to display given the current page and the number of entries displayed
  const rowsToDisplay = getRowsForPage(
    stableSort(rows, getComparator(order, orderBy)),
    { page, rowsPerPage },
  );

  // transform rows' information into displayable information
  const mappedRows = rowsToDisplay.map((item) => {
    const {
      id,
      updatedAt,
      name,
      createdAt,
      type,
      extra,
      ownerName,
      creator,
    } = item;
    const nameAndIcon = (
      <span className={classes.iconAndName}>
        <ItemIcon type={type} extra={extra} name={name} />
        <span className={classes.itemName}>{name}</span>
      </span>
    );

    return {
      id,
      name: nameAndIcon,
      type,
      ownerName,
      updatedAt,
      createdAt,
      extra,
      creator,
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

  // const handleOnClickRow = ({ id, type, extra }) => {
  //   let targetId = id;

  //   // redirect to target if shortcut
  //   if (type === ITEM_TYPES.SHORTCUT) {
  //     targetId = getShortcutTarget(extra);
  //   }
  //   push(buildItemPath(targetId));
  // };

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
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/collections"
              className={classes.collectionsLink}
            >
              <Apps sx={{ mr: 0.5 }} fontSize="inherit" />
              Collections
            </Link>
            {/* <Typography color="text.primary">Breadcrumbs</Typography> */}
            {tableTitle && (
              <Typography
                className={classes.title}
                id={buildItemsTableTitle(tableTitle)}
                component="div"
              >
                {tableTitle}
              </Typography>
            )}
          </Breadcrumbs>
          <Autocomplete
            value={searchValue}
            className={classes.autoComplete}
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
                    id={buildItemsTableRowId(row.id)}
                    // hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    classes={{
                      hover: classes.hover,
                      selected: classes.selected,
                    }}
                  >
                    {headCells.map(({ id: field, align, type }) => (
                      <TableCell
                        key={field}
                        align={align}
                        component="th"
                        id={labelId}
                        scope="row"
                        // onClick={() => {
                        //   // do not navigate when clicking on actions
                        //   const shouldNavigate = idx !== headCells.length - 1;
                        //   if (shouldNavigate) {
                        //     handleOnClickRow(row);
                        //   }
                        // }}
                      >
                        {formatRowValue({ value: row[field], type })}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && empty && (
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
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

ItemsTable.propTypes = {
  items: PropTypes.instanceOf(List),
  tableTitle: PropTypes.string,
  id: PropTypes.string,
  empty: PropTypes.bool,
};

ItemsTable.defaultProps = {
  id: '',
  items: List(),
  empty: true,
  tableTitle: '',
};

export default ItemsTable;
