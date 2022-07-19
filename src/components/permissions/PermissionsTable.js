import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { useTranslation } from 'react-i18next';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ORDERING, ITEM_DATA_TYPES } from '../../enums';
import { getComparator, stableSort, getRowsForPage } from '../../utils/table';
import { formatDate } from '../../utils/date';
import {
  buildPermissionsTableRowId,
  buildPermissionsTableTitle,
  ITEMS_TABLE_EMPTY_ROW_ID,
} from '../../config/selectors';
import {
  EMPTY_ROW_HEIGHT,
  ROWS_PER_PAGE_OPTIONS,
} from '../../config/constants';
import CustomTableHead from '../common/CustomTableHead';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  toolbarDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignPermissions: 'center',
    margin: theme.spacing(1),
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
    alignPermissions: 'center',
  },
  itemName: {
    paddingLeft: theme.spacing(1),
  },
}));

const PermissionsTable = ({
  permissions: rows,
  tableTitle,
  id: tableId,
  empty,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [order, setOrder] = React.useState(ORDERING.DESC);
  const [orderBy, setOrderBy] = React.useState('updatedAt');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    ROWS_PER_PAGE_OPTIONS[0],
  );

  const headCells = [
    {
      id: 'description',
      numeric: false,
      label: t('Description'),
      align: 'left',
    },
    {
      id: 'endpoint',
      numeric: false,
      label: t('Endpoint'),
      align: 'left',
    },
    {
      id: 'method',
      numeric: false,
      label: t('Method'),
      align: 'left',
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
    const { id, description, endpoint, method } = item;

    return {
      id,
      description,
      endpoint,
      method,
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

  // format entry data given type
  const formatRowValue = ({ value, type }) => {
    switch (type) {
      case ITEM_DATA_TYPES.DATE:
        return formatDate(value);
      default:
        return value;
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        {Boolean(tableTitle) && (
          <div className={classes.toolbarDiv}>
            <Typography
              variant="h6"
              id={buildPermissionsTableTitle(tableTitle)}
              component="div"
            >
              {tableTitle}
            </Typography>
          </div>
        )}
        <TableContainer>
          <Table
            id={tableId}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <CustomTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.size}
              headCells={headCells}
            />
            <TableBody>
              {mappedRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    id={buildPermissionsTableRowId(row.id)}
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
                    {headCells.map(({ id: field, align, type }) => (
                      <TableCell
                        key={field}
                        align={align}
                        component="th"
                        id={labelId}
                        scope="row"
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

PermissionsTable.propTypes = {
  permissions: PropTypes.instanceOf(List),
  tableTitle: PropTypes.string,
  id: PropTypes.string,
  empty: PropTypes.bool,
};

PermissionsTable.defaultProps = {
  id: '',
  permissions: List(),
  empty: true,
  tableTitle: '',
};

export default PermissionsTable;
