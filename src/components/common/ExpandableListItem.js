import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import List from '@material-ui/core/List';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ExpandableListItem = ({ itemName, content }) => {
  const classes = useStyles();

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
              <ListItem button className={classes.nested}>
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
