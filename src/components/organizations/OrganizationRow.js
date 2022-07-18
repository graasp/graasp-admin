import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, lighten, makeStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { buildMembersTableRowId } from '../../config/selectors';
import { ITEM_DATA_TYPES } from '../../enums';
import { formatDate } from '../../utils/date';
import { Visibility } from '@material-ui/icons';
// import { useTranslation } from 'react-i18next';

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

const OrganizationRow = ({ data: row, index }) => {
  //   const { t } = useTranslation();
  console.log(row);
  const classes = useStyles();

  //   const renderUsername = () => {
  //     return member?.name || t('Anonymous');
  //   };
  const labelId = `enhanced-table-checkbox-${index}`;
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
    {
      id: 'actions',
      numeric: false,
      label: 'Actions',
      align: 'right',
    },
  ];
  // format entry data given type
  const formatRowValue = ({ value, type }) => {
    switch (type) {
      case ITEM_DATA_TYPES.DATE:
        return formatDate(value);
      default:
        return value;
    }
  };
  const renderActions = () => {
    const actions = [];
    // show if app data is from authenticated member
    // or if has at least write permission

    actions.push(
      <IconButton color="primary">
        <Visibility />
      </IconButton>,
    );

    return actions;
  };

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
          //   onClick={() => {
          //     // do not navigate when clicking on actions
          //     const shouldNavigate = idx !== headCells.length - 1;
          //     if (shouldNavigate) {
          //       handleOnClickRow(row);
          //     }
          //   }}
        >
          {formatRowValue({ value: row[field], type })}
        </TableCell>
      ))}
      {/* <TableCell>{renderActions()}</TableCell> */}
    </TableRow>
  );
};

OrganizationRow.propTypes = {
  index: PropTypes.string.isRequired,
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    id: PropTypes.string,
    itemId: PropTypes.string,
    memberId: PropTypes.string,
    type: PropTypes.string,
    visibility: PropTypes.string,
    createdAt: PropTypes.number,
    creator: PropTypes.string,
    updatedAt: PropTypes.string,
    data: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      extra: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
};

OrganizationRow.defaultProps = {
  member: null,
};

export default OrganizationRow;
