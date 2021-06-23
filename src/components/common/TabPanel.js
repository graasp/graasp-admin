import { Box, Typography } from '@material-ui/core';
import React from 'react';
import * as PropTypes from 'prop-types';

const TabPanel = ({ children, value, index }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default TabPanel;
