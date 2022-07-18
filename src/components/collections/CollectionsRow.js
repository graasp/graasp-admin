import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { buildCollectionsTableRowId } from '../../config/selectors';
import { ITEM_DATA_TYPES } from '../../enums';
import { formatDate } from '../../utils/date';
import { hooks } from '../../config/queryClient';
import ViewCollectionButton from '../common/ViewCollectionButton';
import DeleteCollectionButton from '../common/DeleteCollectionButton';
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
  actionsCell: {
    display: 'flex',
    flexDirection: 'row',
  },
}));
const { useMember } = hooks;

const CollectionsRow = ({ data: row }) => {
  //   const { t } = useTranslation();
  const classes = useStyles();
  const { creator } = row;
  const { data: author, isLoading } = useMember(creator);
  console.log(isLoading);
  const authorName = author?.get('name');

  //   const renderUsername = () => {
  //     return member?.name || t('Anonymous');
  //   };
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
    actions.push(<ViewCollectionButton data={row} key="view" />);
    actions.push(<DeleteCollectionButton data={row} key="delete" />);
    return actions;
  };

  return (
    <TableRow
      id={buildCollectionsTableRowId(row.id)}
      // hover
      tabIndex={-1}
      key={row.id}
      classes={{
        hover: classes.hover,
        selected: classes.selected,
      }}
    >
      <TableCell scope="row">{row.name}</TableCell>
      <TableCell align="right">{!author ? creator : { authorName }}</TableCell>
      <TableCell align="right">
        {formatRowValue({ value: row.createdAt, type: ITEM_DATA_TYPES.DATE })}
      </TableCell>
      <TableCell align="right">
        {formatRowValue({ value: row.updatedAt, type: ITEM_DATA_TYPES.DATE })}
      </TableCell>
      <TableCell align="center" className={classes.actionsCell}>
        {renderActions()}
      </TableCell>
      {/* {headCells.map(({ id: field, align, type }, idx) => (
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
      ))} */}
    </TableRow>
  );
};

CollectionsRow.propTypes = {
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

CollectionsRow.defaultProps = {
  member: null,
};

export default CollectionsRow;
