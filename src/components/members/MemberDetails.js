import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Typography, Box } from '@material-ui/core';
import ReactJson from 'react-json-view';
import { formatDate } from '../../utils/date';

const MemberDetails = ({ member }) => {
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Box
          display="flex"
          flexDirection="column"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          <Typography>{`Id: ${member.get('id')}`}</Typography>
          <Typography>{`Name: ${member.get('name')}`}</Typography>
          <Typography>{`Email: ${member.get('email')}`}</Typography>
          <Typography>{`Type: ${member.get('type')}`}</Typography>
          <Typography>
            {`Created At: ${formatDate(member.get('createdAt'))}`}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          <Typography>Extra:</Typography>

          <ReactJson src={member.get('extra')} />
        </Box>
      </Box>
    </div>
  );
};

MemberDetails.propTypes = {
  member: PropTypes.instanceOf(Map).isRequired,
};

export default MemberDetails;
