import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ITEM_DATA_TYPES } from '../../enums';
import CustomTable from '../common/CustomTable';
import { buildMemberPath } from '../../config/paths';
import { memberHeadCell, TABLE_TYPES } from '../../config/constants';

const MemberTableTry = ({ tableName, members }) => {
  return (
    <CustomTable
      link={buildMemberPath}
      tableType={TABLE_TYPES.MEMBER}
      headCells={memberHeadCell}
      tableTitle={tableName}
      rows={members}
      checkBox
      empty
      icon={<AccountCircleIcon />}
      iconCell="name"
      search
      title
    />
  );
};

MemberTableTry.propTypes = {
  members: PropTypes.instanceOf(List),
  tableName: PropTypes.string.isRequired,
};

MemberTableTry.defaultProps = {
  members: List(),
};

export default MemberTableTry;
