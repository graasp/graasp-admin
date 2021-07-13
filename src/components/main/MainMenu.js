import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import ListItem from '@material-ui/core/ListItem';
import PollIcon from '@material-ui/icons/Poll';
import FolderIcon from '@material-ui/icons/Folder';
import PeopleIcon from '@material-ui/icons/People';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import List from '@material-ui/core/List';
import { ADMIN_PROFILE, HOME_PATH, ITEMS_PATH } from '../../config/paths';

const MainMenu = () => {
  const { t } = useTranslation();
  const [dense] = useState(true);
  const { push } = useHistory();
  const { pathname } = useLocation();

  const goTo = (path) => {
    push(path);
  };

  return (
    <List dense={dense}>
      <ListItem
        button
        onClick={() => goTo(HOME_PATH)}
        selected={pathname === HOME_PATH}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>

        <ListItemText primary={t('Members')} />
      </ListItem>
      <ListItem
        button
        onClick={() => goTo(ITEMS_PATH)}
        selected={pathname === ITEMS_PATH}
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={t('Items')} />
      </ListItem>
      <ListItem
        button
        onClick={() => goTo(ADMIN_PROFILE)}
        selected={pathname === ADMIN_PROFILE}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={t('Profile')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PollIcon />
        </ListItemIcon>
        <ListItemText primary={t('Analytics')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary={t('Settings')} />
      </ListItem>
    </List>
  );
};

export default MainMenu;
