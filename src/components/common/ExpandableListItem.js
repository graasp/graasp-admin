import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { ArrowRight, ExpandLess, ExpandMore } from '@material-ui/icons';
import List from '@material-ui/core/List';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useHistory, useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ExpandableListItem = ({ itemName, icon, content, paths }) => {
  const classes = useStyles();
  const { push } = useHistory();
  const { pathname } = useLocation();

  const [open, setOpen] = React.useState(false);
  const goTo = (path) => {
    push(path);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={itemName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding dense>
          {content.map((e, index) => {
            const path = paths[index];
            return (
              <ListItem
                button
                key={e}
                className={classes.nested}
                onClick={() => goTo(path)}
                selected={pathname.match(path)}
              >
                <ListItemIcon>
                  <ArrowRight />
                </ListItemIcon>
                <ListItemText primary={e} dense />
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
  icon: PropTypes.element.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  paths: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ExpandableListItem;
