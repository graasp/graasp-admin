import React from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material/';
import { Collapse, ListItem, ListItemText } from '@mui/material';
import List from '@mui/material/List';

import PropTypes from 'prop-types';

const ExpandableListItem = ({ itemName, content }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={itemName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {content.map((e) => {
            return (
              <ListItem>
                <ListItemText primary={e} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

ExpandableListItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ExpandableListItem;
